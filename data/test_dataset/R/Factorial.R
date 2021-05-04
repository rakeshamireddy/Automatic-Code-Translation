factorial <- function(n) {
factorial = 1
if(num < 0) {
  print('Sorry, factorial does not exist for negative numbers')
} else if(num == 0) {
  print('The factorial of 0 is 1')
} else {
  for(i in 1:num) {
    factorial = factorial * i
  }
  print(factorial)
}
}
