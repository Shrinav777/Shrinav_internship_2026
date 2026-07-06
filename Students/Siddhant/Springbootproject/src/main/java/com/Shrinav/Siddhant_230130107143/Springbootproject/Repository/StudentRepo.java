package com.Shrinav.Siddhant_230130107143.Springbootproject.Repository;
import com.Shrinav.Siddhant_230130107143.Springbootproject.Entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentRepo extends JpaRepository<Student, Integer> {
}
