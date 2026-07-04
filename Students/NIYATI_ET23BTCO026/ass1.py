name = input("Enter your name: ")
marks = int(input("Enter your marks: "))
print("\nStudent Details")
print("Name:", name)
print("Marks:", marks)
if marks >= 90:
    grade = "A"
elif marks >= 75:
    grade = "B"
elif marks >= 50:
    grade = "C"
else:
    grade = "Fail"
print("Grade:", grade)