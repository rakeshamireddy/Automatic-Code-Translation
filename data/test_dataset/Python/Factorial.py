# Factorial of the number
def factorial(n):
    factorial = 1
    # check is the number is negative, positive or zero
    if(n < 0):
        print("Sorry, factorial does not exist for negative numbers")
    elif(n == 0):
        print("The factorial of 0 is 1")
    else:
        for i in range(1,n):
            factorial = factorial * i
        print('The factorial of {} is {}'.format(n,factorial))

factorial(4)