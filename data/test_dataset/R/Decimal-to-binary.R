# Program to convert decimal number into binary number using recursive function
convert_to_binary <- function(n) {
  if(n > 1) {
    convert_to_binary(as.integer(n/2))
  }
  cat(n %% 2)
}

convert_to_binary(52)