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

# exec("""\nsum <- function(vector){\nresult <- 0\nfor(i in vector){\n    result = result + i\n}\nprint(result)\n}\n\nproduct <- function(vector){\n    result <- 1\n    for(i in vector){\n        result = result*i\n    }\n    print(result)\n}\n\narray <- c(1,2,3,4)\nsum(array)\nproduct(array)\nmean(array, na.rm=TRUE)\n""")



