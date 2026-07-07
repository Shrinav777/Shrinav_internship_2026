class Animal2 {
    void eat() {
        System.out.println("Animal is eating");
    }
}

class Dog2 extends Animal2 {
    void bark() {
        System.out.println("Dog is barking");
    }
}

public class inherit {
    public static void main(String[] args) {
        Dog2 d = new Dog2();

        d.eat();
        d.bark();
    }
}