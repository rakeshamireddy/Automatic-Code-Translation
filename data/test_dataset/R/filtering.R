library(readr)
df <- read_csv("D:/Users/Sriram/Desktop/GG/python2R/nba_2013.csv")
library(dplyr)
df %>% 
  filter(age> 30)