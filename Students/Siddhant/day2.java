// Abstraction : Animal is an abstract class
abstract class Animal{
    abstract void sound();
}


//Inheritence : Lion extends Animal
//Encapsulation : age is private and accessed via getter/setter
class Lion extends Animal{
    private int age;

    public Lion(int age){
        this.age = age;
    }

    public int getAge(){
        return age;
    }
    public void setAge(int age){
        this.age = age;
    }

    @Override
    public void sound(){
        System.out.println("Lion Sound..");
    }
}


public class day2{
    public static void main(String args[]){

        Lion l1 = new Lion(10);
        l1.sound();
        System.out.println("Lion age is : " + l1.getAge());

        //Polymorphism : Animal reference referring to Lion object
        Animal l2 = new Lion(15);
        l2.sound();

    }
}
