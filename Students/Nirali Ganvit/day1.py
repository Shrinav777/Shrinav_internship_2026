name = input("Enter your name: ")
m1 = int(input("Enter marks of Subject 1: "))
m2 = int(input("Enter marks of Subject 2: "))
m3 = int(input("Enter marks of Subject 3: "))

total = m1 + m2 + m3
avg = total / 3

print("Name:", name)
print("Total Marks:", total)
print("Average:", avg)

if avg >= 35:
    print("Result: Pass")
else:
    print("Result: Fail")
