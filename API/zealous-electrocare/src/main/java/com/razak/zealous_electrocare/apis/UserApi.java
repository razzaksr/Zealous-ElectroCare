package com.razak.zealous_electrocare.apis;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razak.zealous_electrocare.entities.User;
import com.razak.zealous_electrocare.services.UserService;

@RestController
@RequestMapping("/users")
public class UserApi {
    @Autowired
    private UserService userService;

    @GetMapping("/{role}")
    public List<User> getUsers(@PathVariable String role){
        // return userService.getByRole("customer");
        // return userService.getByRole("technician");
        return userService.getByRole(role);
    }

    @PostMapping("/signup")
    public User createUsers(@RequestBody User user){
        return userService.createUser(user);
    }

    @PostMapping("/update-fcm-token")
    public ResponseEntity<String> updateFcmToken(@RequestBody Map<String, String> request) {
        userService.updateFcmToken(request.get("username"), request.get("token"));
        return ResponseEntity.ok("FCM Token updated successfully");
    }

    @PostMapping("/update-location")
    public ResponseEntity<String> updateLocation(@RequestBody Map<String, Object> request) {
        User user = userService.getUserByUsername((String)request.get("username"))
                .orElseThrow(() -> new RuntimeException("User not found"));
        user.setLatitude((Double)request.get("latitude"));
        user.setLongitude((Double)request.get("longitude"));
        userService.createUser(user);
        return ResponseEntity.ok("Location updated successfully");
    }


}
