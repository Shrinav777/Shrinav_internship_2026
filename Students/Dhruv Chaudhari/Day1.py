# Simple Electricity Bill Program

name = input("Enter your name: ")
units = int(input("Enter electricity units: "))

bill = units * 6

print("Customer Name:", name)
print("Units Consumed:", units)
print("Bill Amount:", bill)

if bill > 1000:
    discount = bill * 0.10
    final_bill = bill - discount
    print("Discount:", discount)
    print("Final Bill:", final_bill)
else:
    print("No Discount")
    print("Final Bill:", bill)

print("Thank You")



# output


# PS D:\SHRINAV INTERNSHIP\python> python Day1.py
# Enter your name: Dhruv Chaudhari
# Enter electricity units: 58
# Customer Name: Dhruv Chaudhari
# Units Consumed: 58
# Bill Amount: 348
# No Discount
# Final Bill: 348
# Thank You
# PS D:\SHRINAV INTERNSHIP\python> 
