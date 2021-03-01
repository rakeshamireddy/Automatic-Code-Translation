{
    n <- as.integer(readline(prompt = "Enter a number :"))
    i = 1
    s = 0

    while (i < n) {
      if (n %% i == 0) {
        s = s + i
      }
      i = i + 1
    }

    if (s == n) {
      print(paste("The number is perfect :", n))
    } else{
      print(paste("The number is not perfect :", n))
    }
}
