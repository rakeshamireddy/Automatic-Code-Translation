train = nba.sample(frac=0.8, random_state=1)
test = nba.loc[~nba.index.isin(train.index)]