package org.electric.zealous_electro_care.middles;

import java.util.List;

import org.electric.zealous_electro_care.entities.User;
import org.electric.zealous_electro_care.repos.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserMiddle {
    @Autowired
    private UserRepo repo;

    public List<User> getAll(){
        return repo.findAll();
    }

    public List<User> getByRole(String role){
        return repo.findAllByRole(role);
    }

    public User createUser(User user){
        return repo.save(user);
    }

    public User getUserByUsername(String username){
        return repo.findByUsername(username);
    }
    
}
