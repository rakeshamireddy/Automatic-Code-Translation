palindrome <- function(n){
rev = 0
    num = n

    while (n > 0) {
      r = n %% 10
      rev = rev * 10 + r
      n = n %/% 10
    }

    if (rev == num)
    {
      print(paste("Number is palindrome :", rev))
    }
    else{
      print(paste("Number is not palindrome :", rev))
    }
}
palindrome(121)

# exec("""\npalindrome <- function(n){\nrev = 0\n    num = n\n\n    while (n > 0) {\n      r = n %% 10\n      rev = rev * 10 + r\n      n = n %/% 10\n    }\n\n    if (rev == num)\n    {\n      print(paste("Number is palindrome :", rev))\n    }\n    else{\n      print(paste("Number is not palindrome :", rev))\n    }\n}\npalindrome(121)\n""")
