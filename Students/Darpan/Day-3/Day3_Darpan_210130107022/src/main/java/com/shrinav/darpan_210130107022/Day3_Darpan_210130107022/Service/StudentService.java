package com.shrinav.darpan_210130107022.Day3_Darpan_210130107022.Service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.shrinav.darpan_210130107022.Day3_Darpan_210130107022.Entity.Student;
import com.shrinav.darpan_210130107022.Day3_Darpan_210130107022.Repo.StudentRepo;

@Service
public class StudentService {
	
	@Autowired
	private StudentRepo repo;

	public Student save(Student student) 
	{
		return repo.save(student);
	}

}
