package com.Shrinav.Yuvraj_230130107150.repository;

import com.Shrinav.Yuvraj_230130107150.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepository extends JpaRepository<Student, Integer> {

}