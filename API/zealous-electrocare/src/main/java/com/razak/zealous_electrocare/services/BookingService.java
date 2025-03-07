package com.razak.zealous_electrocare.services;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.razak.zealous_electrocare.configs.DistanceCalculator;
import com.razak.zealous_electrocare.entities.Booking;
import com.razak.zealous_electrocare.entities.TechnicianAvailability;
import com.razak.zealous_electrocare.entities.User;
import com.razak.zealous_electrocare.repositories.BookingRemote;
import com.razak.zealous_electrocare.repositories.TechnicianAvailRepo;

@Service
public class BookingService {
    @Autowired
    private BookingRemote bookingRemote;
    @Autowired
    private UserService userService;
    @Autowired
    private FirebaseMessagingService firebaseMessagingService;
    @Autowired
    private TechnicianAvailRepo technicianAvailRepo;
    @Autowired
    private ServiceService serviceService;

    public List<Booking> viewUpComing(){
        return bookingRemote.findAllByStatus("CONFIRMED");
    }

    public List<Booking> viewByTechnician(String username){
        return bookingRemote.findAllByTechnician(username);
    }

    public Booking updateBooking(Booking booking){
        return bookingRemote.save(booking);
    }

    public List<Booking> viewBooks(){
        return bookingRemote.findAll();
    }

    public Booking newBooking(String username,int serviceId, LocalDateTime schedule) {
        User user = userService.getUserByUsername(username).get();
        com.razak.zealous_electrocare.entities.Service service = serviceService.getServiceById(serviceId).get();
        if(user.getRole().equals("customer")&&service!=null){
            User assignedTechnician = findNearestAvailableTechnician(user.getLatitude(), user.getLongitude(),schedule);

            if (assignedTechnician == null) {
                throw new RuntimeException("No available technicians nearby.");
            }

            Booking booking = new Booking();
            booking.setBookedBy(username);
            booking.setScheduledDateTime(schedule);
            booking.setStatus("Booking");
            booking.setService(serviceId);
            booking.setTechnician(assignedTechnician.getUsername());
            booking.setStatus("CONFIRMED");
            bookingRemote.save(booking);

            // Notify the user
            String fcmToken = user.getFcmToken();
            if (fcmToken != null) {
                firebaseMessagingService.sendPushNotification(
                    fcmToken, 
                    "Booking Confirmed", 
                    "Your provider " + assignedTechnician.getFullName() + " has been assigned."
                );
            }
            notifyTechnician(assignedTechnician, booking);

            return booking;
        }
        return null;
    }
    private void notifyTechnician(User technician, Booking booking) {
        if (technician.getFcmToken() != null) {
            firebaseMessagingService.sendPushNotification(
                technician.getFcmToken(),
                "New Booking Request",
                "You have a new service request. Accept or Reject?"
            );
        }
    }

    private User findNearestAvailableTechnician(double userLat, double userLon, LocalDateTime schedule) {
        // List<User> availableProviders = technicianAvailRepo.findByIsAvailable(true);
        User nearestTechnician = null;
        double minDistance = Double.MAX_VALUE;

        for (TechnicianAvailability availability : technicianAvailRepo.findAll()) {
            // time
            if (isProviderAvailable(availability, schedule)) {
                User tempTechnician = userService.getUserByUsername(availability.getTechnician()).get();
                System.out.println("Matched Time technician "+tempTechnician);
                // tempTechnician = tempTechnician.getRole().equals("technician")?tempTechnician:null;
                double distance = DistanceCalculator.calculateDistance(userLat, userLon, tempTechnician.getLatitude(), tempTechnician.getLongitude());
                // location
                if (distance < minDistance) {
                    minDistance = distance;
                    nearestTechnician = tempTechnician;
                    System.out.println("New Technician has set");
                }
            }
        }

        return nearestTechnician;
    }

    private boolean isProviderAvailable(TechnicianAvailability availability, LocalDateTime schedule) {
        return schedule.isAfter(availability.getAvailableFrom()) && schedule.isBefore(availability.getAvailableTo());
    }

    // public Booking confirmBooking(Long bookingId) {
    //     Booking booking = bookingRemote.findById(bookingId)
    //             .orElseThrow(() -> new RuntimeException("Booking not found"));

    //     User user = userService.getUserByUsername(booking.getBookedBy()).get();
    //     User assignedTechnician = null;//findNearestAvailableTechnician(user.getLatitude(), user.getLongitude(),schedule);

    //     if (assignedTechnician == null) {
    //         throw new RuntimeException("No available providers nearby.");
    //     }

    //     booking.setTechnician(assignedTechnician.getUsername());
    //     booking.setStatus("CONFIRMED");
    //     bookingRemote.save(booking);

    //     // Notify the user
    //     String fcmToken = user.getFcmToken();
    //     if (fcmToken != null) {
    //         firebaseMessagingService.sendPushNotification(
    //             fcmToken, 
    //             "Booking Confirmed", 
    //             "Your provider " + assignedTechnician.getFullName() + " has been assigned."
    //         );
    //     }
    //     notifyTechnician(assignedTechnician, booking);

    //     return booking;
    // }

    // public Booking confirmBooking(long bookingId) {
    //     Booking booking = bookingRemote.findById(bookingId)
    //             .orElseThrow(() -> new RuntimeException("Booking not found"));

    //     // Assign provider dynamically (dummy logic)
    //     User assignedProvider = null;//assignProvider(booking);
    //     booking.setTechnician(assignedProvider.getUsername());
    //     booking.setStatus("CONFIRMED");

    //     bookingRemote.save(booking);

    //     // Send notification to customer
    //     String fcmToken = userService.getUserFCMToken(booking.getBookedBy());
    //     if (fcmToken != null) {
    //         firebaseMessagingService.sendPushNotification(
    //             fcmToken, 
    //             "Booking Confirmed", 
    //             "Your provider is " + assignedProvider.getFullName()
    //         );
    //     }

    //     return booking;
    // }

}
