package com.shrinav.amarsinh_240133107007.amarsinh_240133107007.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shrinav.amarsinh_240133107007.amarsinh_240133107007.Entity.Student;
import com.shrinav.amarsinh_240133107007.amarsinh_240133107007.Service.StudentService;

@RestController
@RequestMapping("/Student") 
public class StudentController {

    @Autowired
    private StudentService service;

    @PostMapping("/save")
    public Student addstudent(@RequestBody Student student)
    {
        return service.save(student);
    }
}