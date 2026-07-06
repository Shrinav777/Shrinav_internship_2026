package com.Shrinav.Siddhant_230130107143.Springbootproject.Service;
import com.Shrinav.Siddhant_230130107143.Springbootproject.Repository.StudentRepo;
import com.Shrinav.Siddhant_230130107143.Springbootproject.Entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepo repository;

    public Student saveStudent(Student student) {
        return repository.save(student);
    }

    public List<Student> getAllStudents() {
        return repository.findAll();
    }

    public Student getStudentById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Student updateStudent(Student student) {
        return repository.save(student);
    }

    public String deleteStudent(int id) {
        repository.deleteById(id);
        return "Student deleted successfully";
    }
}
