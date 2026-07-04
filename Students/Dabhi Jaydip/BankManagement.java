// BANK MANAGEMENT SYSTEM
// Demonstration of Encapsulation, Inheritance, Polymorphism, and Abstraction

// Encapsulation
class Account {
    private String accountHolder;
    private double balance;

    public Account(String accountHolder, double balance) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }

    public String getAccountHolder() {
        return accountHolder;
    }

    public double getBalance() {
        return balance;
    }
}

// Inheritance
class Bank {
    public void bankName() {
        System.out.println("Bank Name : State Bank");
    }
}

class Customer extends Bank {
    public void customerName() {
        System.out.println("Customer : Anand");
    }
}

// Polymorphism
class Employee {
    public void showRole() {
        System.out.println("Bank Employee");
    }
}

class Manager extends Employee {
    @Override
    public void showRole() {
        System.out.println("I am the Bank Manager");
    }
}

class Cashier extends Employee {
    @Override
    public void showRole() {
        System.out.println("I am the Bank Cashier");
    }
}

// Abstraction
abstract class Transaction {
    abstract void performTransaction();

    public void welcome() {
        System.out.println("Welcome to State Bank");
    }
}

class Deposit extends Transaction {
    @Override
    void performTransaction() {
        System.out.println("Deposit Transaction Successful");
    }
}

// Main Class
public class BankManagement {

    public static void main(String[] args) {

        System.out.println("===== Encapsulation =====");
        Account a = new Account("Jaydip", 50000);
        System.out.println("Account Holder : " + a.getAccountHolder());
        System.out.println("Balance : " + a.getBalance());

        System.out.println("\n===== Inheritance =====");
        Customer c = new Customer();
        c.bankName();
        c.customerName();

        System.out.println("\n===== Polymorphism =====");
        Employee e;

        e = new Manager();
        e.showRole();

        e = new Cashier();
        e.showRole();

        System.out.println("\n===== Abstraction =====");
        Deposit d = new Deposit();
        d.welcome();
        d.performTransaction();
    }
}
