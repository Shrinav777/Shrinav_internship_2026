import java.util.Scanner;

// ===========================
// Abstract Class (Abstraction)
// ===========================
abstract class LibraryItem {

    // Encapsulation
    private String title;
    private int itemId;
    private boolean available;

    // Constructor
    public LibraryItem(String title, int itemId) {
        this.title = title;
        this.itemId = itemId;
        this.available = true;
    }

    // Getters
    public String getTitle() {
        return title;
    }

    public int getItemId() {
        return itemId;
    }

    public boolean isAvailable() {
        return available;
    }

    // Setter
    protected void setAvailable(boolean available) {
        this.available = available;
    }

    // Issue Item
    public void issueItem() {
        if (available) {
            available = false;
            System.out.println("Item issued successfully.");
        } else {
            System.out.println("Item is already issued.");
        }
    }

    // Return Item
    public void returnItem() {
        if (!available) {
            available = true;
            System.out.println("Item returned successfully.");
        } else {
            System.out.println("Item is already available in library.");
        }
    }

    // Abstract Method
    public abstract void calculateFine(int daysLate);

    // Display Details
    public void displayDetails() {
        System.out.println("\n----- Item Details -----");
        System.out.println("Title      : " + title);
        System.out.println("Item ID    : " + itemId);
        System.out.println("Available  : " + (available ? "Yes" : "No"));
    }
}

// ===================================
// Book Class
// ===================================
class Book extends LibraryItem {

    public Book(String title, int itemId) {
        super(title, itemId);
    }

    // Polymorphism
    @Override
    public void calculateFine(int daysLate) {

        if (daysLate <= 0) {
            System.out.println("No fine.");
        } else {
            double fine = daysLate * 2;
            System.out.println("Fine Amount: ₹" + fine);
        }
    }
}

// ===================================
// Magazine Class
// ===================================
class Magazine extends LibraryItem {

    public Magazine(String title, int itemId) {
        super(title, itemId);
    }

    // Polymorphism
    @Override
    public void calculateFine(int daysLate) {

        if (daysLate <= 0) {
            System.out.println("No fine.");
        } else {
            double fine = daysLate * 5;
            System.out.println("Fine Amount: ₹" + fine);
        }
    }
}

// ===================================
// Main Class
// ===================================
public class LibraryManagement {

    public static void main(String[] args) {

        Scanner sc = new Scanner(System.in);

        System.out.println("====== LIBRARY MANAGEMENT SYSTEM ======");

        // Input Item Details
        System.out.print("Enter Item Title: ");
        String title = sc.nextLine();

        System.out.print("Enter Item ID: ");
        int itemId = sc.nextInt();

        // Choose Item Type
        System.out.println("\nChoose Item Type");
        System.out.println("1. Book");
        System.out.println("2. Magazine");

        System.out.print("Enter choice: ");
        int choice = sc.nextInt();

        // Parent Reference (Polymorphism)
        LibraryItem item;

        if (choice == 1) {
            item = new Book(title, itemId);
        } else {
            item = new Magazine(title, itemId);
        }

        int option;

        do {

            System.out.println("\n====== MENU ======");
            System.out.println("1. Issue Item");
            System.out.println("2. Return Item");
            System.out.println("3. Calculate Fine");
            System.out.println("4. Display Details");
            System.out.println("5. Exit");

            System.out.print("Enter your choice: ");
            option = sc.nextInt();

            switch (option) {

                case 1:
                    item.issueItem();
                    break;

                case 2:
                    item.returnItem();
                    break;

                case 3:
                    System.out.print("Enter number of late days: ");
                    int days = sc.nextInt();
                    item.calculateFine(days);
                    break;

                case 4:
                    item.displayDetails();
                    break;

                case 5:
                    System.out.println("Thank you for using the Library Management System.");
                    break;

                default:
                    System.out.println("Invalid choice.");
            }

        } while (option != 5);

        sc.close();
    }
}