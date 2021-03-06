library(readr)
nba <- read_csv("D:/Users/Sriram/Desktop/GG/python2R/nba_2013.csv")
View(nba)

dim(nba)

head(nba, 1)

library(purrr)
library(dplyr)
nba %>%
  select_if(is.numeric) %>%
  map_dbl(mean, na.rm = TRUE)

library(GGally)
nba %>%
  select(ast, fg, trb) %>%
  ggpairs(upper = list(continuous = "points", 
                       combo ="facethist", discrete = "facetbar", na = "na"))

library(cluster)
set.seed(1)
isGoodCol <- function(col){
  sum(is.na(col)) == 0 && is.numeric(col)
}
goodCols <- sapply(nba, isGoodCol)
clusters <- kmeans(nba[,goodCols], centers=5)
labels <- clusters$cluster


nba2d <- prcomp(nba[,goodCols], center=TRUE)
twoColumns <- nba2d$x[,1:2]
clusplot(twoColumns, labels)


trainRowCount <- floor(0.8 * nrow(nba))
set.seed(1)
trainIndex <- sample(1:nrow(nba), trainRowCount)
train <- nba[trainIndex,]
test <- nba[-trainIndex,]


fit <- lm(ast ~ fg, data=train)
predictions <- predict(fit, test)

summary(fit)