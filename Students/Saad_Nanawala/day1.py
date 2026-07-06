# Saad Nanawala 

# Q1: Check if 'my' exists in the user's string (Case-insensitive)
print("--- Question 1 ---")
user_string = input("Enter your string: ")
# .lower() ensures it catches 'My', 'MY', or 'my' seamlessly
has_my = 'my' in user_string.lower()
print(f"Is 'my' in the string?: {has_my}\n")


# Q2: Check if two strings point to the same memory location
print("--- Question 2 ---")
string_one = input("Enter first string: ")
string_two = input("Enter second string: ")

print(f"String 1 ID: {id(string_one)}")
print(f"String 2 ID: {id(string_two)}")
# 'is' checks the actual object identity in memory
print(f"Are they the exact same object?: {string_one is string_two}\n")


# Q3: Evaluate the chained relation 5 > 10 < 5
print("--- Question 3 ---")
evaluation = 5 > 10 < 5
print(f"Result of 5 > 10 < 5 is: {evaluation}")
print("Reason: Since 5 is not greater than 10, the expression short-circuits to False.")
