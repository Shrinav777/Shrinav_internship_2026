

abstract class BankAccount {


    private String accountHolder;
    private int accountNumber;
    private double balance;


    public BankAccount(String accountHolder, int accountNumber, double balance) {
        this.accountHolder = accountHolder;
        this.accountNumber = accountNumber;
        this.balance = balance;
    }


    public String getAccountHolder() {
        return accountHolder;
    }

    public int getAccountNumber() {
        return accountNumber;
    }

    public double getBalance() {
        return balance;
    }


    protected void setBalance(double balance) {
        this.balance = balance;
    }

    public void deposit(double amount) {
        if (amount > 0) {
            balance += amount;
            System.out.println("₹" + amount + " deposited successfully.");
        } else {
            System.out.println("Invalid amount.");
        }
    }


    public abstract void withdraw(double amount);


    public void displayDetails() {
        System.out.println("\n----- Account Details -----");
        System.out.println("Holder Name : " + accountHolder);
        System.out.println("Account No. : " + accountNumber);
        System.out.println("Balance     : ₹" + balance);
    }
}


class SavingsAccount extends BankAccount {


    public SavingsAccount(String holder, int number, double balance) {
        super(holder, number, balance);
    }


    @Override
    public void withdraw(double amount) {

        if (amount <= 0) {
            System.out.println("Invalid amount.");
        }
        else if (amount > getBalance()) {
            System.out.println("Insufficient Balance.");
        }
        else {
            setBalance(getBalance() - amount);
            System.out.println("₹" + amount + " withdrawn successfully.");
        }
    }
}

class CurrentAccount extends BankAccount {

    private final double OVERDRAFT_LIMIT = 5000;

    public CurrentAccount(String holder, int number, double balance) {
        super(holder, number, balance);
    }

    @Override
    public void withdraw(double amount) {

        if (amount <= 0) {
            System.out.println("Invalid amount.");
        }
        else if (amount > getBalance() + OVERDRAFT_LIMIT) {
            System.out.println("Overdraft limit exceeded.");
        }
        else {
            setBalance(getBalance() - amount);
            System.out.println("₹" + amount + " withdrawn successfully.");
        }
    }
}


public class day2 {

    public static void main(String[] args) {

       
        BankAccount account = new SavingsAccount("Kiran", 101, 10000);

    
        account.deposit(2000);
        System.out.print("Changes for experiment in git");


        account.withdraw(3000);


        account.displayDetails();
    }
}