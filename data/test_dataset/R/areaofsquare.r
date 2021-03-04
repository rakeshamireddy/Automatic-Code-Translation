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
