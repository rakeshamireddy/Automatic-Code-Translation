library(dplyr)
df %>%
  group_by(age) %>%
  summarize_all(mean = mean(pts,na.rm=TRUE))