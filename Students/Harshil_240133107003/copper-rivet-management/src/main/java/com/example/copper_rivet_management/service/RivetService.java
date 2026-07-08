package com.example.copper_rivet_management.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.copper_rivet_management.entity.Rivet;
import com.example.copper_rivet_management.repository.RivetRepository;

@Service
public class RivetService {

    @Autowired
    private RivetRepository repository;

    // Create
    public Rivet saveRivet(Rivet rivet) {
        return repository.save(rivet);
    }

    // Read All
    public List<Rivet> getAllRivets() {
        return repository.findAll();
    }

    // Read By ID
    public Rivet getRivetById(Long id) {
        return repository.findById(id).orElse(null);
    }

    // Update
    public Rivet updateRivet(Long id, Rivet rivet) {

        Rivet existingRivet = repository.findById(id).orElse(null);

        if (existingRivet != null) {
            existingRivet.setCustomerName(rivet.getCustomerName());
            existingRivet.setRivetType(rivet.getRivetType());
            existingRivet.setQuantity(rivet.getQuantity());
            existingRivet.setPrice(rivet.getPrice());

            return repository.save(existingRivet);
        }

        return null;
    }

    // Delete
    public void deleteRivet(Long id) {
        repository.deleteById(id);
    }
}