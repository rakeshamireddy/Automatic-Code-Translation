def matrix():
	
	for i in range(len(A)): 
		for j in range(len(B[0])): 
			for k in range(len(B)): 
				result[i][j] += A[i][k] * B[k][j] 

	for r in result: 
	 	print(r) 
