{
    x <- as.integer(readline(prompt = "Enter first number :"))
    y <- as.integer(readline(prompt = "Enter second number :"))
    z <- as.integer(readline(prompt = "Enter third number :"))

    if (x > y && x > z) {
      print(paste("Greatest is :", x))
    } else if (y > z) {
      print(paste("Greatest is :", y))
    } else{
      print(paste("Greatest is :", z))
    }

}
