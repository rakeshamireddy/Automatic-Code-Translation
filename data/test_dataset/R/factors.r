factors <- function(n) {
n=14
for(i in 1:n)
{
if((n%%i)==0)
{
  return(i)
}
}
}
