// Abstraction
abstract class Vehicle {
    abstract void start();
}

// Inheritance
class Car extends Vehicle {

    // Encapsulation
    private String model;
    private int year;

    public Car(String model, int year) {
        this.model = model;
        this.year = year;
    }

    public String getModel() {
        return model;
    }

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    @Override
    public void start() {
        System.out.println(model + " is starting.");
    }
}

public class Second_day {

    public static void main(String[] args) {

        Car c1 = new Car("Honda City", 2023);

        // Abstraction
        c1.start();

        // Encapsulation
        System.out.println("Model: " + c1.getModel());
        System.out.println("Year: " + c1.getYear());

        c1.setYear(2024);
        System.out.println("Updated Year: " + c1.getYear());

        // Polymorphism
        Vehicle v = new Car("Hyundai i20", 2022);
        v.start();
    }
}