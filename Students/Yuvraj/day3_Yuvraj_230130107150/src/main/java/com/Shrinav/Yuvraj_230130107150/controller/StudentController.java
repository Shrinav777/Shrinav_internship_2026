package com.Shrinav.Yuvraj_230130107150.controller;

import com.Shrinav.Yuvraj_230130107150.entity.Student;
import com.Shrinav.Yuvraj_230130107150.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/students")
public class StudentController {

    @Autowired
    private StudentService studentService;

    @PostMapping("/addstudent")
    public Student addStudent(@RequestBody Student student) {
        return studentService.addStudent(student);
    }

    @GetMapping("/getallstudent")
    public List<Student> getAllStudents() {
        return studentService.getAllStudents();
    }

    @PutMapping("/{rollNo}")
    public Student updateStudent(@PathVariable Integer rollNo,
                                 @RequestBody Student student) {
        return studentService.updateStudent(rollNo, student);
    }

    @DeleteMapping("/{rollNo}")
    public String deleteStudent(@PathVariable Integer rollNo) {
        return studentService.deleteStudent(rollNo);
    }
}