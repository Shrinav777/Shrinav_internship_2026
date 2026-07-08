package com.Shrinav.Bhavesh_Prajapati.Springbootproject.Repository;

import com.Shrinav.Bhavesh_Prajapati.Springbootproject.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Integer> {

}
