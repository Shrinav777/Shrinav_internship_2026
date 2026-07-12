// OOP Example: Copper Rivet Factory Management System

// Abstraction + Encapsulation
abstract class Order {

    private String customerName;
    private double quantity;

    public Order(String customerName, double quantity) {
        this.customerName = customerName;
        this.quantity = quantity;
    }

    public String getCustomerName() {
        return customerName;
    }

    public double getQuantity() {
        return quantity;
    }

    public void displayOrder() {
        System.out.println("Customer Name : " + customerName);
        System.out.println("Order Quantity: " + quantity + " Kg");
    }

    abstract void calculateBill();
}

// Inheritance
class DomesticOrder extends Order {

    public DomesticOrder(String customerName, double quantity) {
        super(customerName, quantity);
    }

    // Polymorphism
    @Override
    void calculateBill() {
        double total = getQuantity() * 700;
        System.out.println("Domestic Bill : " + total);
    }
}

// Inheritance
class ExportOrder extends Order {

    public ExportOrder(String customerName, double quantity) {
        super(customerName, quantity);
    }

    // Polymorphism
    @Override
    void calculateBill() {
        double total = (getQuantity() * 700) + 5000;
        System.out.println("Export Bill   : " + total);
    }
}

// Factory Class
class Factory {

    private String factoryName = "Boricha Copper Rivet Factory";

    public void showFactory() {
        System.out.println("Factory : " + factoryName);
    }
}

// Main Class
public class main {

    public static void main(String[] args) {

        Factory factory = new Factory();
        factory.showFactory();

        // Runtime Polymorphism
        Order order1 = new DomesticOrder("ABC Industries", 200);
        Order order2 = new ExportOrder("XYZ Fasteners", 300);

        System.out.println("\n----- Domestic Order -----");
        order1.displayOrder();
        order1.calculateBill();

        System.out.println("\n----- Export Order -----");
        order2.displayOrder();
        order2.calculateBill();
    }
}