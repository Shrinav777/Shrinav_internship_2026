package com.Shrinav.Bhavesh_Prajapati.Springbootproject.Service;

import com.Shrinav.Bhavesh_Prajapati.Springbootproject.Entity.Student;
import com.Shrinav.Bhavesh_Prajapati.Springbootproject.Repository.StudentRepo;
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
