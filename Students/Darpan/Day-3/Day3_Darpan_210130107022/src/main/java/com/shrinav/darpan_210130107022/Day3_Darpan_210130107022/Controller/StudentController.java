package com.shrinav.darpan_210130107022.Day3_Darpan_210130107022.Controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.shrinav.darpan_210130107022.Day3_Darpan_210130107022.Entity.Student;
import com.shrinav.darpan_210130107022.Day3_Darpan_210130107022.Service.StudentService;

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