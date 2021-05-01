def upper_case(word):
    print word.upper()

def lower_case(word):
    print word.lower()

word = "Dictionary"

upper_case(word)
lower_case(word)

# exec("""\ndef upper_case(word):\n    print word.upper()\n\ndef lower_case(word):\n    print word.lower()\n\nword = "Dictionary"\n\nupper_case(word)\nlower_case(word)\n""")