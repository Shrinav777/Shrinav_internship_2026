// Saad Nanawala

abstract class BankAccount {
    private final String clientName;
    private final int idNumber;
    private double currentBalance;

    public BankAccount(String clientName, int idNumber, double initialBalance) {
        this.clientName = clientName;
        this.idNumber = idNumber;
        this.currentBalance = initialBalance;
    }

    public String getClientName() { return clientName; }
    public int getIdNumber() { return idNumber; }
    public double getCurrentBalance() { return currentBalance; }

    protected void updateBalance(double newBalance) {
        this.currentBalance = newBalance;
    }

    public void addFunds(double money) {
        if (money > 0) {
            currentBalance += money;
            System.out.println("Successfully added: ₹" + money);
        } else {
            System.out.println("Error: Deposit amount must be positive.");
        }
    }

    public abstract void takeFunds(double money);

    public void showAccountSummary() {
        System.out.println("\n=== SUMMARY ===");
        System.out.println("Client Name : " + clientName);
        System.out.println("Account ID  : " + idNumber);
        System.out.println("Net Balance : ₹" + currentBalance);
        System.out.println("===============");
    }
}

class SavingsAccount extends BankAccount {
    public SavingsAccount(String name, int id, double openingBalance) {
        super(name, id, openingBalance);
    }

    @Override
    public void takeFunds(double money) {
        if (money <= 0) {
            System.out.println("Error: Invalid withdrawal request.");
        } else if (money > getCurrentBalance()) {
            System.out.println("Denied: Insufficient funds available.");
        } else {
            updateBalance(getCurrentBalance() - money);
            System.out.println("Successfully debited: ₹" + money);
        }
    }
}

class CurrentAccount extends BankAccount {
    private static final double MAX_OVERDRAFT = 5000.0;

    public CurrentAccount(String name, int id, double openingBalance) {
        super(name, id, openingBalance);
    }

    @Override
    public void takeFunds(double money) {
        if (money <= 0) {
            System.out.println("Error: Invalid withdrawal request.");
        } else if (money > getCurrentBalance() + MAX_OVERDRAFT) {
            System.out.println("Denied: Limit for overdraft reached.");
        } else {
            updateBalance(getCurrentBalance() - money);
            System.out.println("Successfully debited: ₹" + money);
        }
    }
}

public class day2 {
    public static void main(String[] args) {
        // Initializing user test instance
        BankAccount activeAccount = new SavingsAccount("Kiran", 101, 10000);

        // Verification testing flow
        System.out.println("Initiating Git local execution test...");
        activeAccount.addFunds(2000);
        activeAccount.takeFunds(3000);
        
        activeAccount.showAccountSummary();
    }
}
