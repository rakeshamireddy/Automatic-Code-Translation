import pandas as pd
df = pd.read_csv("nba_2013.csv")
df2 = pd.read_csv("nba_2013.csv")

pd.merge(df,df2,left_on="player",right_on="player")