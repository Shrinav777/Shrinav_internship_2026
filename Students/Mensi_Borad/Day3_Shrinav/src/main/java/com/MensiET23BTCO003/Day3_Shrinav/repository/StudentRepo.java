package com.MensiET23BTCO003.Day3_Shrinav.repository;

import com.MensiET23BTCO003.Day3_Shrinav.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {

}
