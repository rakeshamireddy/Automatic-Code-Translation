
armstrong <- function(){
num = 6
sum = 0
temp = num
while(temp > 0) {
digit = temp %% 10
sum = sum + (digit*digit*digit)
temp = temp / 10
}
if(num == sum) {
print('is an Armstrong number'))
} else {
print('is not an Armstrong number'))
}
}
