package com.example.SpringBoot_pro.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.example.SpringBoot_pro.Entity.Student;
import com.example.SpringBoot_pro.Repository.StudentRepo;

@Service
public class StudentService {

    @Autowired
    StudentRepo repo;

    // Insert Student
    public Student addStudent(Student student) {
        return repo.save(student);
    }

    // Get All Students
    public List<Student> getAllStudents() {
        return repo.findAll();
    }

    // Get Student By Id
    public Student getStudentById(int id) {
        return repo.findById(id).orElse(null);
    }

    // Update Student
    public Student updateStudent(Student student) {
        return repo.save(student);
    }

    // Delete Student
    public String deleteStudent(int id) {
        repo.deleteById(id);
        return "Student Deleted Successfully";
    }
}
