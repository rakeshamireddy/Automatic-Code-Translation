def convert_to_binary(n): 

      if(n > 1):
        convert_to_binary(n//2)
      n = n%2
      print(n)
