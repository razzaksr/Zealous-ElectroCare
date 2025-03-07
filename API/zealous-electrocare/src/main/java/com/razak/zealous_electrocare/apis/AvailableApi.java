package com.razak.zealous_electrocare.apis;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razak.zealous_electrocare.entities.TechnicianAvailability;
import com.razak.zealous_electrocare.entities.User;
import com.razak.zealous_electrocare.repositories.TechnicianAvailRepo;
import com.razak.zealous_electrocare.services.UserService;

@RestController
@RequestMapping("/avail")
@CrossOrigin(origins = "http://localhost:3000")
public class AvailableApi {
    @Autowired
    private TechnicianAvailRepo repo;
    @Autowired
    private UserService userService;

    @GetMapping("/")
    public List<TechnicianAvailability> viewAll(){
        return repo.findAll();
    }

    @PostMapping("/update/{username}/{from}/{to}")
    public TechnicianAvailability updateAvailability(@PathVariable String username, 
    @PathVariable LocalDateTime from,@PathVariable LocalDateTime to){
        User user = userService.getUserByUsername(username).get();
        if(user.getRole().equals("technician")){
            TechnicianAvailability availability = new TechnicianAvailability();
            availability.setTechnician(username);
            availability.setAvailableFrom(from);
            availability.setAvailableTo(to);
            return repo.save(availability);
        }
        return null;
    }
}
