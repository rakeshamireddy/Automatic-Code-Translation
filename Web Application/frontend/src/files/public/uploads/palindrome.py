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

# exec("""\ndef palindrome(num):\n    temp = num\n    rev = 0\n    while(num > 0):\n        dig = num % 10\n        rev = rev * 10 + dig\n        num = num // 10\n    if(temp == rev):\n        print("Number is palindrome")\n    else: \n        print("Number is not palidrome")\n\npalindrome(131)\n""")