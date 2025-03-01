package com.razak.zealous_electrocare.services;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;

import com.razak.zealous_electrocare.entities.Service;
import com.razak.zealous_electrocare.repositories.ServiceRemote;

@org.springframework.stereotype.Service
public class ServiceService {
    @Autowired
    private ServiceRemote serviceRemote;
    public Service newService(Service service){
        return serviceRemote.save(service);
    }
    public Optional<Service> getServiceById(int id){
        return serviceRemote.findById(id);
    }
    public List<Service> getAllServices(){
        return serviceRemote.findAll();
    }
    public void removeServiceById(int id){
        serviceRemote.deleteById(id);
    }
}
