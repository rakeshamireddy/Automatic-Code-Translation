library(readr)
df <- read_csv("D:/Users/Sriram/Desktop/GG/python2R/nba_2013.csv")
library(dplyr)
df %>%
  group_by(age) %>%
  summarize_all(mean = mean(pts,na.rm=TRUE))