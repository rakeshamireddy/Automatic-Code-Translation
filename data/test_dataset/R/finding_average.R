library(purrr)
library(dplyr)
nba %>%
  select_if(is.numeric) %>%
  map_dbl(mean, na.rm = TRUE)