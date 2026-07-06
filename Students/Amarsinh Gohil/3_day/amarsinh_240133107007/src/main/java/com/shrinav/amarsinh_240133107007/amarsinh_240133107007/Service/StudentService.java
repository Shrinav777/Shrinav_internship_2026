package com.shrinav.amarsinh_240133107007.amarsinh_240133107007.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shrinav.amarsinh_240133107007.amarsinh_240133107007.Entity.Student;
import com.shrinav.amarsinh_240133107007.amarsinh_240133107007.Repo.StudentRepo;

@Service
public class StudentService {
	
	@Autowired
	private StudentRepo repo;

	public Student save(Student student) 
	{
		return repo.save(student);
	}

}
