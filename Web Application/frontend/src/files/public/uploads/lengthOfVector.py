def lengthOfVector(nums):
    count = 0
    for x in nums:
        count = count+1
    
    print(count)

array = [1,6,4,2,8,9]
lengthOfVector(array)

# exec("""\ndef lengthOfVector(nums):\n    count = 0\n    for x in nums:\n        count = count+1\n    \n    print(count)\n\narray = [1,6,4,2,8,9]\nlengthOfVector(array)\n""")
