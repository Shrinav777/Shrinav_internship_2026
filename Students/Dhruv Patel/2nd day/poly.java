
class Animal1 {
    void sound() {
        System.out.println("Animal makes a sound");
    }
}

class Dog1 extends Animal1 {
    @Override
    void sound() {
        System.out.println("Dog barks");
    }
}

class Cat extends Animal1 {
    @Override
    void sound() {
        System.out.println("Cat meows");
    }
}

public class poly {
    public static void main(String[] args) {
        Animal1 a;

        a = new Dog1();
        a.sound();

        a = new Cat();
        a.sound();
    }
}