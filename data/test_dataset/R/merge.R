df2 <- read_csv("D:/Users/Sriram/Desktop/GG/python2R/nba_2013.csv")

df3 <-merge(df,df2,by.df="player",by.df2="player")