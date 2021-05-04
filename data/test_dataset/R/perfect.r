perfect <- function()
{
    n <- 24
    i = 1
    s = 0

    while (i < n) {
      if (n %% i == 0) {
        s = s + i
      }
      i = i + 1
    }

    if (s == n) {
      return(n)
    } else{
      return(n)
    }
}
