// HOSPITAL MANAGEMENT


// Encapsulation

package Encapsulation;

 class Patient {

    private String patientName;
    private int age;

    public Patient(String patientName, int age) {
        this.patientName = patientName;
        this.age = age;
    }

    public String getPatientName() {
        return patientName;
    }

    public int getAge() {
        return age;
    }
}

public class HospitalManagement1 {

    public static void main(String[] args) {

        Patient p = new Patient("Anand", 21);

        System.out.println("Patient Name : " + p.getPatientName());
        System.out.println("Age : " + p.getAge());
    }
}


// Inheritance

package Inheritance;

class Person {

    public void hospitalName() {
        System.out.println("My Hospital");
    }
}

class Doctor extends Person {

    public void doctorName() {
        System.out.println("Doctor : Dr. Yash");
    }
}

public class HospitalManagement2 {

    public static void main(String[] args) {

        Doctor d = new Doctor();

        d.hospitalName();
        d.doctorName();
    }
}


// Polymorphism

package Polymorphism;
class Person {

    public void showRole() {
        System.out.println("Hospital Member");
    }
}

class Doctor extends Person {

    @Override
    public void showRole() {
        System.out.println("I am a Doctor Yash");
    }
}

class Nurse extends Person {

    @Override
    public void showRole() {
        System.out.println("I am a Nurse");
    }
}

public class HospitalManagement3 {

    public static void main(String[] args) {

        Person p;

        p = new Doctor();
        p.showRole();

        p = new Nurse();
        p.showRole();
    }
}


// Abstraction
abstract class Person {

    abstract void showRole();

    public void hospital() {
        System.out.println("Welcome to My Hospital");
    }
}

class Doctor extends Person {

    @Override
    void showRole() {
        System.out.println("Doctor is Treating Patients");
    }
}

public class HospitalManagement4 {

    public static void main(String[] args) {

        Doctor d = new Doctor();

        d.hospital();
        d.showRole();
    }
}
