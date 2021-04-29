def areaSquare(side):
    if(side <= 0 ):
        print 'Invalid measurement'
    else:
        print 'Area of the square is : ', side*side

areaSquare(4)

# exec("""\ndef areaSquare(side):\n    if(side <= 0 ):\n        print 'Invalid measurement'\n    else:\n        print 'Area of the square is : ', side*side\n\nareaSquare(4)\n""")