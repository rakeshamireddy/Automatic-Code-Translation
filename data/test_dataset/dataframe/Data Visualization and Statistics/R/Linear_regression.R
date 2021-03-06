fit <- lm(ast ~ fg, data=train)
predictions <- predict(fit, test)