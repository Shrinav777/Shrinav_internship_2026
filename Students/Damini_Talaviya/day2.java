// Abstraction
abstract class Animal {
    public abstract void sound();
}

// Inheritance + Polymorphism
class Dog extends Animal {
    @Override
    public void sound() {
        System.out.println("Dog says: Woof");
    }
}

class Cat extends Animal {
    @Override
    public void sound() {
        System.out.println("Cat says: Meow");
    }
}

// Encapsulation
class Person {
    private String name;

    void setName(String name) {
        this.name = name;
    }

    String getName() {
        return name;
    }
}

public class day2 {
    public static void main(String[] args) {
        Animal a1 = new Dog();
        Animal a2 = new Cat();
        a1.sound();
        a2.sound();

        Person p = new Person();
        p.setName("Damini");
        System.out.println("Name: " + p.getName());
    }
}