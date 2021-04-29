lengthofVector <- function(vector){
count <- 0
for (i in vector){
    count <- count + 1
}
print(count)
}

array <- c(3,4,5,1,6)
lengthofVector(array)

# exec("""\nlengthofVector <- function(vector){\ncount <- 0\nfor (i in vector){\n    count <- count + 1\n}\nprint(count)\n}\n\narray <- c(3,4,5,1,6)\nlengthofVector(array)\n""")