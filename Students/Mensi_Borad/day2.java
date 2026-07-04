//abstraction
interface animal {
    void animalSound();
    void color();
}
//inheritance
class cat implements animal {
    //encapsulation
    private String name;
    public cat(String name) {
        this.name = name;
    }
    public String getName() {
        return name;
    }
    //polymorphism
    @Override
    public void animalSound() {
        System.out.println("It says Meow Meow !!");
    }

    @Override
    public void color() {
        System.out.println("It's color is blue and white.");
    }
}
public class day2 {
    public static void main(String[] args) {
        cat mycat = new cat("Tom");
        mycat.animalSound();
        mycat.color();
        System.out.println("The name of the cat is : " + mycat.getName());
    }
}


