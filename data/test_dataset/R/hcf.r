# Program to find the H.C.F of two input number
# define a function
hcf <- function(x, y) {
# choose the smaller number
if(x > y) {
smaller = y
} else {
smaller = x
}
for(i in 1:smaller) {
if((x %% i == 0) && (y %% i == 0)) {
hcf = i
}
}
return(hcf)
}
# take input from the user
num1 = 12
num2 = 36
print(paste("The H.C.F. of", num1,"and", num2,"is", hcf(num1, num2)))
