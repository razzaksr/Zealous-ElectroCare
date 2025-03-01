package com.razak.zealous_electrocare.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.razak.zealous_electrocare.entities.User;

@Repository
public interface UserRemote extends JpaRepository<User,String>{
    Optional<User> findByUsername(String username);
}
