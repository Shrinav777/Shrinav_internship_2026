// Abstract class (Abstraction)
abstract class Employee {
    // Encapsulation
    private String name;
    private int employeeId;

    // Constructor
    public Employee(String name, int employeeId) {
        this.name = name;
        this.employeeId = employeeId;
    }

    // Getters 
    public String getName() {
        return name;
    }

    public int getEmployeeId() {
        return employeeId;
    }

    public abstract double calculateSalary();

    
    public void displayDetails() {
        System.out.println("Employee ID : " + employeeId);
        System.out.println("Employee Name : " + name);
    }
}

class FullTimeEmployee extends Employee {
    private double monthlySalary;

    public FullTimeEmployee(String name, int employeeId, double monthlySalary) {
        super(name, employeeId);
        this.monthlySalary = monthlySalary;
    }

    @Override
    public double calculateSalary() {
        return monthlySalary;
    }
}

// Inheritance
class PartTimeEmployee extends Employee {
    private int hoursWorked;
    private double hourlyRate;

    public PartTimeEmployee(String name, int employeeId, int hoursWorked, double hourlyRate) {
        super(name, employeeId);
        this.hoursWorked = hoursWorked;
        this.hourlyRate = hourlyRate;
    }

    @Override
    public double calculateSalary() {
        return hoursWorked * hourlyRate;
    }
}

// Main class
public class day2 {
    public static void main(String[] args) {

        Employee emp1 = new FullTimeEmployee("Alice", 101, 50000);
        Employee emp2 = new PartTimeEmployee("Bob", 102, 80, 500);

        System.out.println("Full-Time Employee");
        emp1.displayDetails();
        System.out.println("Salary: " + emp1.calculateSalary());

        System.out.println("\nPart-Time Employee");
        emp2.displayDetails();
        System.out.println("Salary: " + emp2.calculateSalary());
    }
}