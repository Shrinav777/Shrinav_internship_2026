package com.Shrinav.Ravi_230130107022.Repository;
import com.Shrinav.Ravi_230130107022.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmployeeRepo extends JpaRepository<Employee, Integer> {
}
