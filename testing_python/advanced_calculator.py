import math

def main():
    print("Advanced Calculator")
    while True:
        print("\n" + "="*40)
        print("1. Basic Operations (+, -, *, /)")
        print("2. Power Functions (x^y, square root)")
        print("3. Logarithmic Functions (log10, ln)")
        print("4. Trigonometric Functions (sin, cos, tan)")
        print("5. Quit")
        print("="*40)

        choice = input("Enter your choice (1-5): ")

        if choice == '1':
            basic_calculator()
        elif choice == '2':
            power_functions()
        elif choice == '3':
            logarithmic_functions()
        elif choice == '4':
            trigonometric_functions()
        elif choice == '5':
            print("Thank you for using Advanced Calculator!")
            break
        else:
            print("Invalid option. Please choose 1-5.")

def get_number(prompt="Enter a number: "):
    """Helper function to get a valid number input"""
    while True:
        try:
            return float(input(prompt))
        except ValueError:
            print("Invalid input. Please enter a valid number.")

def basic_calculator():
    print("\n--- Basic Operations ---")
    num1 = get_number("Enter first number: ")
    num2 = get_number("Enter second number: ")

    print("\nOperations:")
    print("1. Addition (+)")
    print("2. Subtraction (-)")
    print("3. Multiplication (*)")
    print("4. Division (/)")

    choice = input("Enter operation (1-4): ")

    if choice == '1':
        result = num1 + num2
        print(f"{num1} + {num2} = {result}")
    elif choice == '2':
        result = num1 - num2
        print(f"{num1} - {num2} = {result}")
    elif choice == '3':
        result = num1 * num2
        print(f"{num1} * {num2} = {result}")
    elif choice == '4':
        if num2 != 0:
            result = num1 / num2
            print(f"{num1} / {num2} = {result}")
        else:
            print("Error! Division by zero is not allowed.")
    else:
        print("Invalid operation. Please choose 1-4.")

def power_functions():
    print("\n--- Power Functions ---")
    print("1. Power (x^y)")
    print("2. Square root")
    
    choice = input("Enter function (1-2): ")
    
    if choice == '1':
        base = get_number("Enter base: ")
        exponent = get_number("Enter exponent: ")
        try:
            result = base ** exponent
            print(f"{base}^{exponent} = {result}")
        except OverflowError:
            print("Error! Result is too large.")
    elif choice == '2':
        num = get_number("Enter number: ")
        if num >= 0:
            result = math.sqrt(num)
            print(f"√{num} = {result}")
        else:
            print("Error! Cannot calculate square root of negative number.")
    else:
        print("Invalid function. Please choose 1-2.")

def logarithmic_functions():
    print("\n--- Logarithmic Functions ---")
    print("1. Log base 10")
    print("2. Natural log (ln)")
    
    choice = input("Enter function (1-2): ")
    num = get_number("Enter a positive number: ")
    
    if num <= 0:
        print("Error! Logarithm is only defined for positive numbers.")
        return
    
    try:
        if choice == '1':
            result = math.log10(num)
            print(f"log₁₀({num}) = {result}")
        elif choice == '2':
            result = math.log(num)
            print(f"ln({num}) = {result}")
        else:
            print("Invalid function. Please choose 1-2.")
    except ValueError:
        print("Error! Mathematical error occurred.")

def trigonometric_functions():
    print("\n--- Trigonometric Functions ---")
    angle = get_number("Enter angle in degrees: ")

    print("\nFunctions:")
    print("1. Sine (sin)")
    print("2. Cosine (cos)")
    print("3. Tangent (tan)")

    choice = input("Enter function (1-3): ")
    
    # Convert to radians
    angle_rad = math.radians(angle)

    if choice == '1':
        result = math.sin(angle_rad)
        print(f"sin({angle}°) = {result}")
    elif choice == '2':
        result = math.cos(angle_rad)
        print(f"cos({angle}°) = {result}")
    elif choice == '3':
        result = math.tan(angle_rad)
        print(f"tan({angle}°) = {result}")
    else:
        print("Invalid function. Please choose 1-3.")

if __name__ == "__main__":
    main()