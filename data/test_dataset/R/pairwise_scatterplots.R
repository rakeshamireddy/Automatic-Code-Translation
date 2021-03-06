library(GGally)
nba %>%
  select(ast, fg, trb) %>%
  ggpairs(upper = list(continuous = "points", 
                       combo ="facethist", discrete = "facetbar", na = "na"))