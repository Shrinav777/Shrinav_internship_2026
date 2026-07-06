// Saad Nanawala 
// Topic: Spring Boot REST Controller for CRUD Operations

package com.example.demo.controller;

import org.springframework.web.bind.annotation.*;
import java.util.ArrayList;
import java.util.List;

// Simple Model Entity
class Scholar {
    private int id;
    private String name;
    private String track;

    public Scholar(int id, String name, String track) {
        this.id = id;
        this.name = name;
        this.track = track;
    }

    public int getId() { return id; }
    public String getName() { return name; }
    public String getTrack() { return track; }
    public void setTrack(String track) { this.track = track; }
}

@RestController
@RequestMapping("/api/scholars")
public class ScholarController {

    private final List<Scholar> database = new ArrayList<>();

    public ScholarController() {
        // Pre-populating with a test record
        database.add(new Scholar(1, "Saad Nanawala", "Java Backend"));
    }

    // 1. CREATE (Post Request)
    @PostMapping("/add")
    public String createRecord(@RequestBody Scholar newScholar) {
        database.add(newScholar);
        return "Record for " + newScholar.getName() + " saved successfully!";
    }

    // 2. READ (Get Request)
    @GetMapping("/all")
    public List<Scholar> getAllRecords() {
        return database;
    }

    // 3. UPDATE (Put Request)
    @PutMapping("/update/{id}")
    public String updateRecord(@PathVariable int id, @RequestParam String newTrack) {
        for (Scholar s : database) {
            if (s.getId() == id) {
                s.setTrack(newTrack);
                return "ID " + id + " updated to new track: " + newTrack;
            }
        }
        return "Record with ID " + id + " not found.";
    }

    // 4. DELETE (Delete Request)
    @DeleteMapping("/remove/{id}")
    public String deleteRecord(@PathVariable int id) {
        boolean removed = database.removeIf(s -> s.getId() == id);
        if (removed) {
            return "Record with ID " + id + " removed successfully.";
        }
        return "ID " + id + " does not exist.";
    }
}
