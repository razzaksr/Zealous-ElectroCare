package com.razak.zealous_electrocare.entities;

import java.time.LocalDateTime;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Entity
public class TechnicianAvailability {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long availableId;
    private String technician;
    private LocalDateTime availableFrom;
    private LocalDateTime availableTo;
}