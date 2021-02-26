# Program to check if the input number is odd or even.
# A number is even if division by 2 give a remainder of 0.
# If remainder is 1, it is odd.
def odd_or_even(n):
    num = n
    
    if((num % 2) == 0):
        print('{} is Even'.format(num))
    else:
        print('{} is Odd'.format(num))


odd_or_even(4)