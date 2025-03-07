package com.razak.zealous_electrocare.repositories;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.razak.zealous_electrocare.entities.TechnicianAvailability;

@Repository
public interface TechnicianAvailRepo extends JpaRepository<TechnicianAvailability,Long> {
    List<TechnicianAvailability> findAllByTechnician(String technician);
    List<TechnicianAvailability> findAllByAvailableFromLessThanEqualAndAvailableToGreaterThanEqual(LocalDateTime start, LocalDateTime end);
}
