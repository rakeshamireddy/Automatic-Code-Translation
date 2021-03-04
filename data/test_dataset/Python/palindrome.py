def palindrome(num):
    temp = num
    rev = 0
    while(num > 0):
        dig = num % 10
        rev = rev * 10 + dig
        num = num // 10
    if(temp == rev):
        print("Number is palindrome")
    else: 
        print("Number is not palidrome")

palindrome(131)