package com.razak.zealous_electrocare.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.razak.zealous_electrocare.entities.User;
import com.razak.zealous_electrocare.repositories.UserRemote;

@Service
public class UserService {
    @Autowired
    private UserRemote userRemote;

    public List<User> getByRole(String role){
        return userRemote.findAllByRole(role);
    }

    public User createUser(User user){
        return userRemote.save(user);
    }

    public Optional<User> getUserByUsername(String username){
        return userRemote.findByUsername(username);
    }

    public void updateFcmToken(String username, String token) {
        User user = userRemote.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setFcmToken(token);
        userRemote.save(user);
    }

    public String getUserFCMToken(String username){
        return userRemote.findByUsername(username).get().getFcmToken();
    }
}
