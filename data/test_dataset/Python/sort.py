import pandas as pd
df = pd.read_csv("nba_2013.csv")
df.sort_values(by = 'age')