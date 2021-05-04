def unique(list1):

	
	unique_list = []
	
	
	for x in list1:
		
		if x not in unique_list:
			unique_list.append(x)
	
	for x in unique_list:
		print(x)
list1 = [10, 20, 10, 30, 40, 40]
