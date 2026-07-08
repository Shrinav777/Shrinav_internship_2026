package com.example.copper_rivet_management.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.copper_rivet_management.entity.Rivet;
import com.example.copper_rivet_management.service.RivetService;

@RestController
@RequestMapping("/rivets")
public class RivetController {

    @Autowired
    private RivetService service;

    // Create
    @PostMapping
    public Rivet saveRivet(@RequestBody Rivet rivet) {
        return service.saveRivet(rivet);
    }

    // Read All
    @GetMapping
    public List<Rivet> getAllRivets() {
        return service.getAllRivets();
    }

    // Read By ID
    @GetMapping("/{id}")
    public Rivet getRivetById(@PathVariable Long id) {
        return service.getRivetById(id);
    }

    // Update
    @PutMapping("/{id}")
    public Rivet updateRivet(@PathVariable Long id, @RequestBody Rivet rivet) {
        return service.updateRivet(id, rivet);
    }

    // Delete
    @DeleteMapping("/{id}")
    public String deleteRivet(@PathVariable Long id) {
        service.deleteRivet(id);
        return "Rivet Deleted Successfully";
    }
}