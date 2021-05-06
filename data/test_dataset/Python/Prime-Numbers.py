def prime_numbers(n):
     prime_nums = [] 
     if (n >= 2):
        
        for i in range(2,n):
             for j in range(2,i):
                  
                  if i%j == 0:
                      break
             else:
                 prime_nums.append(i)
        return(prime_nums)
     else: 
           print('Input number should be at least 2')
