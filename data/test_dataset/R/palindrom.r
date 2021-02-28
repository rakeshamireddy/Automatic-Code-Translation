x=121;
rev=0;
num=x;
while(x>0){
r = x %% 10
rev = rev * 10 + r
x = x %% 10
}if(rev == num){
print(paste("Number is palindrome: ", rev))
}else{
print(paste("Number is not palindrome: ", rev))
}

