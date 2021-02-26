def fibonacci(n): 
    
    fibonacci_seq = [None for i in range(n)]
    fibonacci_seq[0] = fibonacci_seq[1] = 1
    for i in range(2,n):
        
           fibonacci_seq[i] = fibonacci_seq[i - 2] + fibonacci_seq[i - 1]
    print("First {} Fibonacci numbers:".format(n))
    print(fibonacci_seq)


fibonacci(10)