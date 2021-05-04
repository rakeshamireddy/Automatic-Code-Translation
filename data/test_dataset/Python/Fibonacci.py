def fibonacci(n): 
    
    fibonacci = [None for i in range(n)]
    fibonacci[0] = fibonacci[1] = 1
    for i in range(2,n):
        	fibonacci[i] = fibonacci[i - 2] + fibonacci[i - 1]
    print('First {} Fibonacci numbers:'.format(n))
    print(fibonacci)
