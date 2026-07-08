print("My name is Yadav Harsh")
print("This is a program of fibonacci series")
n = int(input("Enter n: "))
a, b = 0, 1
print("Fibonacci Series:")
for i in range(n):
    print(a, end=" ")
    a, b = b, a + b
