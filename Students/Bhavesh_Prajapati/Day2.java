// Abstraction
abstract class Notification {
    
    // Encapsulation
    private String message;

    // Constructor
    Notification(String message) {
        this.message = message;
    }

    // Getter
    public String getMessage() {
        return message;
    }

    // Abstract method
    abstract void send();
}

// Inheritance
class EmailNotification extends Notification {

    EmailNotification(String message) {
        super(message);
    }

    // Polymorphism (Method Overriding)
    @Override
    void send() {
        System.out.println("Email Sent: " + getMessage());
    }
}

class SmsNotification extends Notification {

    SmsNotification(String message) {
        super(message);
    }

    // Polymorphism (Method Overriding)
    @Override
    void send() {
        System.out.println("SMS Sent: " + getMessage());
    }
}

public class Day2 {

    public static void main(String[] args) {

        // Polymorphism
        Notification n1 = new EmailNotification("Welcome to our website!");
        Notification n2 = new SmsNotification("Your OTP is 482951");

        n1.send();
        n2.send();
    }
}