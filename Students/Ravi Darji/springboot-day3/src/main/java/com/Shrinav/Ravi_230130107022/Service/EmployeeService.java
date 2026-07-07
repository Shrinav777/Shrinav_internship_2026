package com.Shrinav.Ravi_230130107022.Service;
import com.Shrinav.Ravi_230130107022.Repository.EmployeeRepo;
import com.Shrinav.Ravi_230130107022.Entity.Employee;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService {

    @Autowired
    private EmployeeRepo repository;

    public Employee saveEmployee(Employee employee) {
        return repository.save(employee);
    }

    public List<Employee> getAllEmployees() {
        return repository.findAll();
    }

    public Employee getEmployeeById(int id) {
        return repository.findById(id).orElse(null);
    }

    public Employee updateEmployee(Employee employee) {
        return repository.save(employee);
    }

    public String deleteEmployee(int id) {
        repository.deleteById(id);
        return "Employee deleted successfully";
    }
}
