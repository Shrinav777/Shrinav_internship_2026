import java.util.ArrayList;
import java.util.List;

// Abstraction
abstract class GymMember {

    private String memberName;

    public GymMember(String memberName) {
        this.memberName = memberName;
    }

    public String getMemberName() {
        return memberName;
    }

    public abstract void attendWorkout();

    public abstract String getMembershipDetails();
}

// Inheritance + Encapsulation
class BasicMember extends GymMember {

    private int workoutDays;
    private int attendance;

    public BasicMember(String memberName, int workoutDays) {
        super(memberName);
        this.workoutDays = workoutDays;
        this.attendance = 0;
    }

    @Override
    public void attendWorkout() {
        attendance++;
        System.out.println(getMemberName() +
                " attended Basic Gym session.");
    }

    @Override
    public String getMembershipDetails() {
        return getMemberName()
                + " | Membership : Basic"
                + " | Workout Days : " + workoutDays
                + " | Attendance : " + attendance;
    }
}

// Inheritance + Encapsulation
class PremiumMember extends GymMember {

    private String trainerName;
    private int attendance;

    public PremiumMember(String memberName, String trainerName) {
        super(memberName);
        this.trainerName = trainerName;
        this.attendance = 0;
    }

    @Override
    public void attendWorkout() {
        attendance++;
        System.out.println(getMemberName()
                + " attended Premium Gym session with "
                + trainerName + ".");
    }

    @Override
    public String getMembershipDetails() {
        return getMemberName()
                + " | Membership : Premium"
                + " | Trainer : " + trainerName
                + " | Attendance : " + attendance;
    }
}

// Main Class
public class Main {

    public static void main(String[] args) {

        List<GymMember> members = new ArrayList<>();

        members.add(new BasicMember("Amarsinh", 5));
        members.add(new PremiumMember("Rahul", "Mr. Patel"));

        System.out.println("----- Gym Attendance -----");

        for (GymMember member : members) {
            member.attendWorkout();
        }

        System.out.println("\n----- Membership Report -----");

        for (GymMember member : members) {
            System.out.println(member.getMembershipDetails());
        }
    }
}