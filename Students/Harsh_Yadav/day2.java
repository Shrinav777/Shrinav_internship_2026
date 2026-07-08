
class Student {

    private int rollNo;
    private String fname;
    private String lname;
    private String course;
    private String enrollmentNo;

    Student(int rollNo, String firstName, String lastName, String course, String enrollmentNo) {
        this.rollNo = rollNo;
        this.fname = firstName;
        this.lname = lastName;
        this.course = course;
        this.enrollmentNo = enrollmentNo;
    }
    public int getRollNo() {
        return rollNo;
    }
    public void setRollNo(int rollNo) {
        this.rollNo = rollNo;
    }
    public String getFname() {
        return fname;
    }
    public void setFname(String firstName) {
        this.fname = firstName;
    }
    public String getLname() {
        return lname;
    }
    public void setLname(String lastName) {
        this.lname = lastName;
    }
    public String getCourse() {
        return course;
    }
    public void setCourse(String course) {
        this.course = course;
    }
    public String getEnrollmentNo() {
        return enrollmentNo;
    }
    public void setEnrollmentNo(String enrollmentNo) {
        this.enrollmentNo = enrollmentNo;
    }
}

public class day2 {

    public static void main(String[] args) {

        Student student = new Student(
                101,
                "Harsh",
                "Yadav",
                "Computer Engineering",
                "230130107151");

        System.out.println("Student Details");
        System.out.println("Roll No: " + student.getRollNo());
        System.out.println("First Name: " + student.getFname());
        System.out.println("Last Name: " + student.getLname());
        System.out.println("Course: " + student.getCourse());
        System.out.println("Enrollment No: " + student.getEnrollmentNo());
    }
}