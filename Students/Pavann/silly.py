name = input("Enter your name: ").strip()

vowels = sum(1 for c in name.lower() if c in "aeiou")
consonants = sum(1 for c in name.lower() if c.isalpha()) - vowels
length = len(name)

score = (vowels * 3 + consonants - length) % 6

personalities = [
    "The 'it works on my machine' type ",
    "The one who fixes bugs by adding more print statements ",
    "The chaotic genius who codes without testing ",
    "The overthinker who Googles a one-line fix for 2 hours ",
    "The calm one who reads the error message first (rare) ",
    "The person who blames the compiler for everything "
]

print(f"\nName: {name}")
print(f"Vowels: {vowels} | Consonants: {consonants} | Length: {length}")
print(f"\n Your Debugging Personality is:\n{personalities[score]}")