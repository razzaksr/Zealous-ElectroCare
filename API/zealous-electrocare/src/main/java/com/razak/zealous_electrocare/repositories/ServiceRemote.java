package com.razak.zealous_electrocare.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.razak.zealous_electrocare.entities.Service;

@Repository
public interface ServiceRemote extends JpaRepository<Service,Integer>{
    
}
