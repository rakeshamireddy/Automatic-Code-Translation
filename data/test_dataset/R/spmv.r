sum <- function(vector){
result <- 0
for(i in vector){
    result = result + i
}
print(result)
}

product <- function(vector){
    result <- 1
    for(i in vector){
        result = result*i
    }
    print(result)
}

array <- c(1,2,3,4)
sum(array)
product(array)
mean(array, na.rm=TRUE)



