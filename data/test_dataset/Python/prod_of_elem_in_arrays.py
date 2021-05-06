def prod_of_elem_in_arrays():
    a = list(range(1,11))
    b = list(range(2,12))
    return [a[i] * b[i] for i in range(len(a))]