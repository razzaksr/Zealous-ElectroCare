package com.razak.zealous_electrocare.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class Booking {
    @Id
    private long bookingId;
    private String bookedBy;
    private String technician;
    private LocalDateTime scheduledDateTime;
    private int service;
    private String status;
}
