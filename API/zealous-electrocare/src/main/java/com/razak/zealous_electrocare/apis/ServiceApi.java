package com.razak.zealous_electrocare.apis;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.razak.zealous_electrocare.entities.Service;
import com.razak.zealous_electrocare.services.ServiceService;

@RestController
@RequestMapping("/service")
public class ServiceApi {
    @Autowired
    private ServiceService serviceService;
    
    @PostMapping("/")
    public Service newOne(@RequestBody Service service){
        return serviceService.newService(service);
    }

    @GetMapping("/{id}")
    public Optional<Service> readOne(@PathVariable int id){
        return serviceService.getServiceById(id);
    }

    @GetMapping("/")
    public List<Service> readAll(){
        return serviceService.getAllServices();
    }

    @PutMapping("/update")
    public Service update(@RequestBody Service service){
        return serviceService.newService(service);
    }

    @DeleteMapping("/del/{id}")
    public String deletion(@PathVariable int id){
        serviceService.removeServiceById(id);
        return "Service "+id+" has been discontinued";
    }

}
