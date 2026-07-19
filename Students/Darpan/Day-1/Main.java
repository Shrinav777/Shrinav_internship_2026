package task_2;
abstract class Animal
{
    abstract void sound();

    void eat()
    {
        System.out.println("Animal is eating");
    }
}

class Tiger extends Animal
{
    private String name;     // Encapsulation

    public void setName(String name)
    {
        this.name = name;
    }

    public String getName()
    {
        return name;
    }

    void sound()            // Polymorphism
    {
        System.out.println("Tiger Roars");
    }
}

public class Main
{
    public static void main(String args[])
    {
        Tiger t = new Tiger();

        t.setName("Sheru");

        System.out.println("Tiger Name : " + t.getName());

        t.eat();

        t.sound();
    }
}