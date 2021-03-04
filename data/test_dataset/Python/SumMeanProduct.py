import numpy as np
def sum(nums):
    sum = 0
    for x in nums:
        sum = sum + x
    print(sum)

def avg(nums):
   print(np.mean(nums))

def product(nums):
    print(np.prod(nums))

list1 = [3,4,5]

sum(list1)
avg(list1)
product(list1)
