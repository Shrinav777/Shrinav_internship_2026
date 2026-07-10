package com.example.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.example.model.Student;
import com.example.repository.StudentRepository;

@RestController
@RequestMapping("/api")
public class StudentController {

	final StudentRepository studentRepository;

	StudentController(StudentRepository studentRepository) {
		this.studentRepository = studentRepository;
	}
	
	@PostMapping("/students")
	public String createNewStudent(@RequestBody Student student) {
		studentRepository.save(student);
		return "Employee Created in database";
}
}