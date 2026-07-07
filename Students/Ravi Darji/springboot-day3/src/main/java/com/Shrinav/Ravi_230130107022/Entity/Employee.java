package com.Shrinav.Ravi_230130107022.Entity;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class Employee {
        @Id
        private int id;
        private String name;
        private String email;
        private String department;
        private double salary;
}
