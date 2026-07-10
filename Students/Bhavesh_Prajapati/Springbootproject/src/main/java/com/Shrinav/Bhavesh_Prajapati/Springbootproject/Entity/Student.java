package com.Shrinav.Bhavesh_Prajapati.Springbootproject.Entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Student {

    @Id
    private int id;

    private String name;

    private String email;
}