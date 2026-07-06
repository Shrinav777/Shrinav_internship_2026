package com.shrinavintern.DhruvPatel.repository;


import com.shrinav.Anand_230130107047.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface StudentRepo extends JpaRepository<Student, Long> {

}
