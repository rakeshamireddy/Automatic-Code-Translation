import pandas as pd
df = pd.read_csv("nba_2013.csv")
df.groupby(by ="age").mean()