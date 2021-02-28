num = as.double(readline(prompt="Enter a number: "))
if(num > 0) {
  print("Positive number")
} else {
  if(num == 0) {
    print("Zero")
  } else {
    print("Negative number")
  }
}