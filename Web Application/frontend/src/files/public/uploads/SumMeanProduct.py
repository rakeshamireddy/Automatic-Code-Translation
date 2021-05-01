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

# exec("""\nimport numpy as np\ndef sum(nums):\n    sum = 0\n    for x in nums:\n        sum = sum + x\n    print(sum)\n\ndef avg(nums):\n   print(np.mean(nums))\n\ndef product(nums):\n    print(np.prod(nums))\n\nlist1 = [3,4,5]\n\nsum(list1)\navg(list1)\nproduct(list1)\n""")