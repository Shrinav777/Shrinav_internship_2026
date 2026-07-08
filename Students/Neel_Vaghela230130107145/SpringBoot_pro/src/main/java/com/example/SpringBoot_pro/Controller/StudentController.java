package com.example.SpringBoot_pro.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import com.example.SpringBoot_pro.Entity.Student;
import com.example.SpringBoot_pro.Service.StudentService;

@RestController
@RequestMapping("/student")
public class StudentController {

    @Autowired
    StudentService service;

    // Insert
    @PostMapping("/add")
    public Student addStudent(@RequestBody Student student) {

        System.out.println("===== REQUEST RECEIVED =====");
        System.out.println(student.getName());
        System.out.println(student.getDepartment());
        System.out.println(student.getAge());

        return service.addStudent(student);
    }

    // Get All
    @GetMapping("/all")
    public List<Student> getAllStudents() {
        return service.getAllStudents();
    }

    // Get By Id
    @GetMapping("/{id}")
    public Student getStudent(@PathVariable int id) {
        return service.getStudentById(id);
    }

    // Update
    @PutMapping("/update")
    public Student updateStudent(@RequestBody Student student) {
        return service.updateStudent(student);
    }

    // Delete
    @DeleteMapping("/delete/{id}")
    public String deleteStudent(@PathVariable int id) {
        return service.deleteStudent(id);
    }
}