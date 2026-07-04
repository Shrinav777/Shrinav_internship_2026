import random

j = random.randint(1, 100)
count = 0
max_attempts = 10
print("-----Guess the number between 1 to 100 in 10 attempts.-----")
while count < max_attempts:
    g = int(input("Guess a jackpot number: "))
    count += 1
    if g > j:
        print("Lower value...")
    elif g < j:
        print("Higher value...")
    else:
        print("You won the jackpot!!!")
        break
    if count == max_attempts:
        print(f"You loose the jackpot. The number was {j}.")

print("Total number of attempts is: ", count)