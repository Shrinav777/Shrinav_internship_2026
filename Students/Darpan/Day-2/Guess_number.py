import random

secret_number = random.randint(1, 20)
max_attempts = 5

print("=== Number Guessing Game ===")
print("Guess a number between 1 and 20")
print("You have 5 attempts.\n")

for attempt in range(1, max_attempts + 1):
    guess = int(input(f"Attempt {attempt}: Enter your guess: "))

    if guess == secret_number:
        print("🎉 Correct! You guessed the number.")
        break
    elif guess < secret_number:
        print("Too low!")
    else:
        print("Too high!")

else:
    print("\nGame Over!")
    print("The correct number was:", secret_number)