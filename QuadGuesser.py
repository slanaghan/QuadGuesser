import random

def generate_quadratic(level):
    """Generate a random quadratic equation and its properties based on the level."""
    if level == 1:  # Easy level
        a = 1  # Standard graph
    elif level == 2:  # Medium level
        a = random.choice([-2, -1, 1, 2])
    else:  # Hard level
        a = random.choice([-3, -2, -1, 1, 2, 3])

    h = random.randint(-5, 5)  # x-coordinate of the vertex
    k = random.randint(-5, 5)  # y-coordinate of the vertex
    equation = f"{a}*(x-{h})**2+{k}"

    # Calculate discriminant to determine x-intercepts
    discriminant = -4 * a * k  # In vertex form, b = 0, so b^2 - 4ac = -4ac
    if discriminant > 0:
        x1 = h + (discriminant**0.5) / (2 * a)
        x2 = h - (discriminant**0.5) / (2 * a)
        roots = (round(x1, 2), round(x2, 2))
        x_intercepts = 2
    elif discriminant == 0:
        roots = (h,)
        x_intercepts = 1
    else:
        roots = None
        x_intercepts = 0

    y_intercept = a * h**2 + k  # Calculate the y-intercept

    return {
        "a": a,
        "h": h,
        "k": k,
        "equation": equation,
        "discriminant": discriminant,
        "roots": roots,
        "x_intercepts": x_intercepts,
        "y_intercept": y_intercept,
    }

def generate_alternative_equations(correct_properties):
    """Generate alternative equations by slightly modifying one attribute."""
    alternatives = []
    for _ in range(3):  # Generate 3 alternative equations
        alternative = correct_properties.copy()
        choice = random.choice(["a", "h", "k"])  # Randomly choose an attribute to modify

        if choice == "a":
            # Flip the sign or slightly adjust the magnitude
            alternative["a"] = -alternative["a"] if random.random() < 0.5 else alternative["a"] + random.choice([-1, 1])
        elif choice == "h":
            # Adjust x-coordinate of the vertex by ±1
            alternative["h"] += random.choice([-1, 1])
        elif choice == "k":
            # Adjust y-coordinate of the vertex by ±1
            alternative["k"] += random.choice([-1, 1])

        # Recreate the equation with the modified attribute
        alternative["equation"] = f"{alternative['a']}*(x-{alternative['h']})**2+{alternative['k']}"
        alternatives.append(alternative["equation"])

    return alternatives

def quadratic_guessing_game():
    print("Welcome to the Quadratic Graph Guessing Game!")
    print("The game gets harder as you progress, and hints become more challenging.")

    total_score = 0
    rounds = 3  # Number of rounds

    for round_num in range(1, rounds + 1):
        print(f"\nRound {round_num}:")
        level = round_num  # Progressively harder equations
        correct_properties = generate_quadratic(level)
        correct_eq = correct_properties["equation"]

        # Generate 3 alternative equations
        alternative_equations = generate_alternative_equations(correct_properties)
        options = [correct_eq] + alternative_equations
        random.shuffle(options)  # Shuffle the options

        # Display the options
        print("\nOptions:")
        for i, option in enumerate(options, 1):
            print(f"{i}: f(x) = {option}")

        # Generate hints
        hints = [
            f"The parabola opens {'up' if correct_properties['a'] > 0 else 'down'}.",
            f"The x-coordinate of the vertex is {correct_properties['h']}.",
            f"The y-coordinate of the vertex is {correct_properties['k']}.",
            f"The y-intercept is {correct_properties['y_intercept']}.",
        ]
        random.shuffle(hints)  # Randomize hint order

        # Hint-based guessing
        attempts = 0
        while attempts < 3:
            print(f"\nHint {attempts + 1}: {hints[attempts]}")
            guess = input("Choose the correct graph (1-4): ").strip()
            if guess.isdigit() and 1 <= int(guess) <= 4:
                if options[int(guess) - 1] == correct_eq:
                    points = 15 - (attempts * 5)
                    total_score += points
                    print(f"Correct! You earned {points} points this round.")
                    break
                else:
                    print("Wrong! Try again.")
            else:
                print("Invalid input. Please choose a number between 1 and 4.")
            attempts += 1

        if attempts == 3:
            print(f"Out of attempts! The correct graph was: f(x) = {correct_eq}")

    print(f"\nGame Over! Your final score is: {total_score} points.")

if __name__ == "__main__":
    quadratic_guessing_game()
