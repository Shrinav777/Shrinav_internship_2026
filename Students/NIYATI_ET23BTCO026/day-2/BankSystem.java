// Interface
interface Transaction {
    void deposit(double amount);
    void withdraw(double amount);
}
// Abstract Class
abstract class BankAccount implements Transaction {
    private String accountHolder;
    private double balance;
    // Constructor
    BankAccount(String accountHolder, double balance) {
        this.accountHolder = accountHolder;
        this.balance = balance;
    }
    // Encapsulation (Getter)
    public String getAccountHolder() {
        return accountHolder;
    }
    public double getBalance() {
        return balance;
    }
    // Encapsulation (Setter)
    public void setBalance(double balance) {
        this.balance = balance;
    }
    // Common Method
    public void display() {
        System.out.println("Account Holder : " + accountHolder);
        System.out.println("Balance : " + balance);
    }
    // Abstract Method
    abstract void accountType();
}
// Inheritance
class SavingAccount extends BankAccount {
    SavingAccount(String name, double balance) {
        super(name, balance);
    }
    // Method Overriding (Polymorphism)
    @Override
    void accountType() {
        System.out.println("Account Type : Saving Account");
    }
    @Override
    public void deposit(double amount) {
        setBalance(getBalance() + amount);
        System.out.println(amount + " Deposited");
    }
    @Override
    public void withdraw(double amount) {
        if(amount <= getBalance()) {
            setBalance(getBalance() - amount);
            System.out.println(amount + " Withdrawn");
        }
        else {
            System.out.println("Insufficient Balance");
        }
    }
}
public class BankSystem {
    public static void main(String[] args) {
        // Object
        SavingAccount s1 = new SavingAccount("Niyati",10000);
        s1.accountType();
        s1.display();
        s1.deposit(5000);
        s1.withdraw(3000);
        System.out.println("Final Balance : " + s1.getBalance());
    }
}