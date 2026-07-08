package com.Shrinav.Yuvraj_230130107150.service;

import com.Shrinav.Yuvraj_230130107150.entity.Student;
import com.Shrinav.Yuvraj_230130107150.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService {

    @Autowired
    private StudentRepository studentRepository;

    public Student addStudent(Student student) {
        return studentRepository.save(student);
    }

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public Student updateStudent(Integer rollNo, Student student) {

        Student existingStudent = studentRepository.findById(rollNo)
                .orElseThrow(() -> new RuntimeException("Student Not Found"));

        existingStudent.setName(student.getName());
        existingStudent.setCity(student.getCity());

        return studentRepository.save(existingStudent);
    }

    public String deleteStudent(Integer rollNo) {

        Student student = studentRepository.findById(rollNo)
                .orElseThrow(() -> new RuntimeException("Student Not Found"));

        studentRepository.delete(student);

        return "Student Deleted Successfully";
    }
}