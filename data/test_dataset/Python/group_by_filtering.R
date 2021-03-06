library(dplyr)
df %>%
  group_by(age) %>%
  filter(mean(g)>10)