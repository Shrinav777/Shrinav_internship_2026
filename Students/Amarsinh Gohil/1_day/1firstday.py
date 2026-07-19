name = input("Enter student name: ")
marks1 = int(input("Enter marks of Subject 1: "))
marks2 = int(input("Enter marks of Subject 2: "))
marks3 = int(input("Enter marks of Subject 3: "))

total = marks1 + marks2 + marks3
percentage = total / 3

print("\n----- Result -----")
print("Name:", name)
print("Total Marks:", total)
print("Percentage:", percentage)

if percentage >= 35:
    print("Result: Pass")
else:
    print("Result: Fail")