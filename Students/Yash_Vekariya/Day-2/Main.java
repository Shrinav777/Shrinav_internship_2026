import java.util.ArrayList;
import java.util.List;

// ------------------ Abstraction ------------------
abstract class Vehicle {

  private String vehicleNumber;

  public Vehicle(String vehicleNumber) {
    this.vehicleNumber = vehicleNumber;
  }

  public String getVehicleNumber() {
    return vehicleNumber;
  }

  // Abstract Methods
  public abstract void start();

  public abstract String getDetails();
}

// ------------------ Inheritance + Encapsulation ------------------
class Car extends Vehicle {

  private int seats;

  public Car(String vehicleNumber, int seats) {
    super(vehicleNumber);
    this.seats = seats;
  }

  @Override
  public void start() {
    System.out.println("Car " + getVehicleNumber() + " started using a key.");
  }

  @Override
  public String getDetails() {
    return "Car | Number: " + getVehicleNumber() +
        " | Seats: " + seats;
  }
}

// ------------------ Inheritance + Encapsulation ------------------
class Bike extends Vehicle {

  private boolean helmetProvided;

  public Bike(String vehicleNumber, boolean helmetProvided) {
    super(vehicleNumber);
    this.helmetProvided = helmetProvided;
  }

  @Override
  public void start() {
    System.out.println("Bike " + getVehicleNumber() + " started using self-start.");
  }

  @Override
  public String getDetails() {
    return "Bike | Number: " + getVehicleNumber() +
        " | Helmet Provided: " + helmetProvided;
  }
}

// ------------------ Main Class ------------------
public class Main {

  public static void main(String[] args) {

    // Polymorphism
    List<Vehicle> vehicles = new ArrayList<>();

    vehicles.add(new Car("GJ01AB1234", 5));
    vehicles.add(new Bike("GJ05CD5678", true));

    System.out.println("----- Vehicle Starting -----");

    for (Vehicle vehicle : vehicles) {
      vehicle.start();
    }

    System.out.println("\n----- Vehicle Details -----");

    for (Vehicle vehicle : vehicles) {
      System.out.println(vehicle.getDetails());
    }
  }
}