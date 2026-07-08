
public class oop {
    public static void main(String args[]){
        // Creating object of SoftwareEngineer
        SoftwareEngineer se1 = new SoftwareEngineer("Aman", "Software", "Java");
        se1.work();  
        se1.work(8); 
        se1.work("Banking System"); 

        
        Engineer se2 = new SoftwareEngineer("Manan", "Software", "Python");
        se2.work();  
    }
}
// Abstraction
abstract class Engineer {
    private String name;   // Encapsulation : private field
    private String field;

    public Engineer(String name, String field) {
        this.name = name;
        this.field = field;
    }

    // Encapsulation 
    public String getName() {
        return name;
    }
    public void setName(String name) {
        this.name = name;
    }

    public String getField() {
        return field;
    }
    public void setField(String field) {
        this.field = field;
    }

    // Abstraction : abstract method
    public abstract void work();

    // Overloading : same method name, different parameters
    public void work(int hours) {
        System.out.println(name + " is working in " + field + " engineering for " + hours + " hours.");
    }
}

// Inheritance
class SoftwareEngineer extends Engineer {
    private String programmingLanguage;

    public SoftwareEngineer(String name, String field, String programmingLanguage) {
        super(name, field); // Inheritance (parent constructor)
        this.programmingLanguage = programmingLanguage;
    }

    // Polymorphism
    @Override
    public void work() {
        System.out.println(getName() + " is developing software in " + programmingLanguage + ".");
    }

    public void work(String projectName) {
        System.out.println(getName() + " is working on project: " + projectName + " using " + programmingLanguage + ".");
    }
}
