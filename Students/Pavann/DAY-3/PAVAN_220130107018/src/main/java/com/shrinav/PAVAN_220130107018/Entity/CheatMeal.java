
package com.shrinav.PAVAN_220130107018.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import java.time.LocalDate;

@Entity
public class CheatMeal {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private Integer calories;
    private LocalDate date;

    // Default Constructor
    public CheatMeal() {}

    // Parameterized Constructor
    public CheatMeal(String name, Integer calories, LocalDate date) {
        this.name = name;
        this.calories = calories;
        this.date = date;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public Integer getCalories() { return calories; }
    public void setCalories(Integer calories) { this.calories = calories; }

    public java.time.LocalDate getDate() { return date; }
    public void setDate(LocalDate date) { this.date = date; }
}