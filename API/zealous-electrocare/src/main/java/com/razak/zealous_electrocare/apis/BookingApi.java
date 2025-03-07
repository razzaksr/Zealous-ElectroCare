package com.razak.zealous_electrocare.apis;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razak.zealous_electrocare.entities.Booking;
import com.razak.zealous_electrocare.entities.Service;
import com.razak.zealous_electrocare.entities.User;
import com.razak.zealous_electrocare.services.BookingService;
import com.razak.zealous_electrocare.services.FirebaseMessagingService;
import com.razak.zealous_electrocare.services.UserService;

@RestController
@RequestMapping("/booking")
public class BookingApi {
    @Autowired
    private FirebaseMessagingService firebaseMessagingService;
    @Autowired
    private UserService userService;
    @Autowired
    private BookingService bookingService;

    @GetMapping("/yet")
    public List<Booking> viewUp(){
        return bookingService.viewUpComing();
    }

    @GetMapping("/tech/{technician}")
    public List<Booking> viewByTech(@PathVariable String technician){
        return bookingService.viewByTechnician(technician);
    }

    @PutMapping("/update")
    public Booking updateBook(@RequestBody Booking booking){
        return bookingService.updateBooking(booking);
    }

    @GetMapping("/")
    public List<Booking> viewBookings(){
        return bookingService.viewBooks();
    }

    @PostMapping("/confirm/{username}/{schedule}/{serviceId}")
    public ResponseEntity<String> confirmBooking(@PathVariable String username,@PathVariable LocalDateTime schedule,@PathVariable int serviceId) {
        try{
            if(bookingService.newBooking(username, serviceId, schedule)!=null)
                return ResponseEntity.ok("Booking confirmed & notification sent!");
            else
                return ResponseEntity.ofNullable("Booking Not confirmed");
        }
        catch(RuntimeException runtimeException){
            return ResponseEntity.ofNullable("Technician/ Service was not available ");
        }
    }

    // @PostMapping("/confirm/{bookingId}")
    // public ResponseEntity<String> confirmBooking(@PathVariable Long bookingId) {
    //     bookingService.confirmBooking(bookingId);
    //     return ResponseEntity.ok("Booking confirmed & notification sent!");
    // }

    // @PostMapping("/bookings/confirm")
    // public ResponseEntity<String> confirmBooking(@RequestBody Booking booking) {
    //     // Get assigned provider
    //     User assignedProvider = null;//bookingService.assignProvider(booking);

    //     // Send Push Notification
    //     firebaseMessagingService.sendPushNotification(
    //         userService.getUserFCMToken(booking.getBookedBy()),
    //         "Booking Confirmed",
    //         "Your provider is " + assignedProvider.getFullName()
    //     );

    //     return ResponseEntity.ok("Booking confirmed & notification sent!");
    // }

}
