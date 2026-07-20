import java.util.ArrayList;
import java.util.List;

// ======================
// Abstraction
// ======================
abstract class DevelopmentGoal {

    private String goalName;

    public DevelopmentGoal(String goalName) {
        this.goalName = goalName;
    }

    public String getGoalName() {
        return goalName;
    }

    public abstract void completeExercise();

    public abstract String getProgress();
}

// ======================
// Inheritance + Encapsulation
// ======================
class MindfulnessHabit extends DevelopmentGoal {

    private int minutes;
    private int streak;

    public MindfulnessHabit(String goalName, int minutes) {
        super(goalName);
        this.minutes = minutes;
        this.streak = 0;
    }

    @Override
    public void completeExercise() {
        streak++;
        System.out.println("Meditation completed for " + minutes + " minutes.");
    }

    @Override
    public String getProgress() {
        return getGoalName() + " | Streak: " + streak + " day(s)";
    }
}

// ======================
// Inheritance + Encapsulation
// ======================
class PublicSpeakingHabit extends DevelopmentGoal {

    private int duration;
    private int speeches;

    public PublicSpeakingHabit(String goalName, int duration) {
        super(goalName);
        this.duration = duration;
        this.speeches = 0;
    }

    @Override
    public void completeExercise() {
        speeches++;
        System.out.println("Speech practiced for " + duration + " minutes.");
    }

    @Override
    public String getProgress() {
        return getGoalName() + " | Speeches Completed: " + speeches;
    }
}

// ======================
// Main Class
// ======================
public class Main {

    public static void main(String[] args) {

        List<DevelopmentGoal> goals = new ArrayList<>();

        goals.add(new MindfulnessHabit("Morning Meditation", 15));
        goals.add(new PublicSpeakingHabit("Daily Speech Practice", 5));

        System.out.println("----- Daily Activities -----");

        for (DevelopmentGoal goal : goals) {
            goal.completeExercise();
        }

        System.out.println("\n----- Progress Report -----");

        for (DevelopmentGoal goal : goals) {
            System.out.println(goal.getProgress());
        }
    }
}