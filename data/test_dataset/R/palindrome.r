palindrome <- function(num){
    rev = 0
    temp = num
    while (num > 0) {
      dig = num %% 10
      rev = rev * 10 + dig
      num = num %/% 10
    }
    if (rev == temp)
    {
     return (TRUE)
    }
    else{
      return (FALSE)
    }
}
