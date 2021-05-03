fibobacci <- function(n) {
Fibonacci <- numeric(n)
Fibonacci[1] <- Fibonacci[2] <- 1
for (i in 3:10) Fibonacci[i] <- Fibonacci[i - 2] + Fibonacci[i - 1]
print('First 10 Fibonacci numbers:')
print(Fibonacci)
}
