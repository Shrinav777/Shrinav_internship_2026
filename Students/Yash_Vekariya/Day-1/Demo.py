# Function
def greet(name):
    return "Hello, " + name + "!"


name = input("Enter your name: ")
age = int(input("Enter your age: "))



# Function Call
print(greet(name))

# Conditional Statement
if age >= 18:
    print("You are eligible to vote.")
else:
    print("You are not eligible to vote.")
