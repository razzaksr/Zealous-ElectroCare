package com.razak.zealous_electrocare.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String username;
    private String fullName;
    private long mobile;
    private String password;
    private String email;
    private String role;
    private double latitude;
    private double longitude;
    private String fcmToken;
}
