import pandas as pd
df = pd.read_csv("nba_2013.csv")
df.groupby('age').filter(lambda x:x.g.mean() > 10)