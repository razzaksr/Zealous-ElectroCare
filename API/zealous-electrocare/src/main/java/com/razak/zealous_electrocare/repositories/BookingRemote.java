package com.razak.zealous_electrocare.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.razak.zealous_electrocare.entities.Booking;

@Repository
public interface BookingRemote extends JpaRepository<Booking,Long>{
    List<Booking> findAllByBookedBy(String bookedBy);
    List<Booking> findAllByTechnician(String technician);
    List<Booking> findAllByScheduledDateTimeBetween(LocalDateTime startDateTime, LocalDateTime endDateTime);
    List<Booking> findAllByStatus(String status);
}
