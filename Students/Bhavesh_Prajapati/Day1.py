import random
computer = random.choice([1,-1, 0])
youStr = input("Enter your choice(s for snake, w for water, g for gun) :")
yourDict = {"s": 1,"w": -1,"g": 0}
reverseDict = {1:"Snake", -1 :"Water", 0 :"Gun"}
you = yourDict[youStr]

print(f"your choice {reverseDict[you]}\ncomputer choice {reverseDict[computer]}")
if(computer == you):
    print("Match is draw")
else:
    if(computer == -1 and you == 1):
        print("You win!")
    elif(computer == -1 and you == 0):
        print("You loose!")
    elif(computer == 1 and you == 0):
        print("You win!")
    elif(computer == 1 and you == -1):
        print("You loose!")
    elif(computer == 0 and you == 1):
        print("You loose!")
    elif(computer == 0 and you == -1):
        print("You win!")
    else:
        print("something went wrong!!")