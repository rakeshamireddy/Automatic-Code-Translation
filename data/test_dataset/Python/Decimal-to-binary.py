# Program to convert decimal number into binary number using recursive function
def convert_to_binary(n): 

      if(n > 1):
        convert_to_binary(n//2)
  
      print(n % 2, end = '')

convert_to_binary(52)