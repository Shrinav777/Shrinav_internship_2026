// OOP Example : Dholak & Tabla Shop

// Abstraction + Encapsulation
abstract class Instrument {

    private String customerName;
    private int quantity;

    public Instrument(String customerName, int quantity) {
        this.customerName = customerName;
        this.quantity = quantity;
    }

    public String getCustomerName() {
        return customerName;
    }

    public int getQuantity() {
        return quantity;
    }

    public void showDetails() {
        System.out.println("Customer Name : " + customerName);
        System.out.println("Quantity      : " + quantity);
    }

    abstract void calculatePrice();
}

// Inheritance
class Dholak extends Instrument {

    public Dholak(String customerName, int quantity) {
        super(customerName, quantity);
    }

    // Polymorphism
    @Override
    void calculatePrice() {
        int total = getQuantity() * 2500;
        System.out.println("Dholak Price  : " + total);
    }
}

// Inheritance
class Tabla extends Instrument {

    public Tabla(String customerName, int quantity) {
        super(customerName, quantity);
    }

    // Polymorphism
    @Override
    void calculatePrice() {
        int total = getQuantity() * 4500;
        System.out.println("Tabla Price   : " + total);
    }
}

// Shop Class
class MusicShop {

    private String shopName = "Shree Music Shop";

    public void showShop() {
        System.out.println("Shop Name : " + shopName);
    }
}

// Main Class
public class second_day{

    public static void main(String[] args) {

        MusicShop shop = new MusicShop();
        shop.showShop();

        // Runtime Polymorphism
        Instrument item1 = new Dholak("Rahul", 2);
        Instrument item2 = new Tabla("Amit", 1);

        System.out.println("\n--- Dholak Order ---");
        item1.showDetails();
        item1.calculatePrice();

        System.out.println("\n--- Tabla Order ---");
        item2.showDetails();
        item2.calculatePrice();
    }
}