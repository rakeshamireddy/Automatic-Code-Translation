areaSquare <- function(num) {
   msg1 <- "Invalid measurement"
   msg2 <- "Area of the Square is: "
   if  (num <= 0){
        print(msg1)
   }else {
       print (msg2)
       print(num*num)
   }
  
}

areaSquare(6)

# exec("""\nareaSquare <- function(num) {\n   msg1 <- "Invalid measurement"\n   msg2 <- "Area of the Square is: "\n   if  (num <= 0){\n        print(msg1)\n   }else {\n       print (msg2)\n       print(num*num)\n   }\n  \n}\n\nareaSquare(6)\n""")
