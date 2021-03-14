import pandas as pd
df = pd.read_csv("nba_2013.csv")
df.rename({'a': 'b'}, axis = 1)