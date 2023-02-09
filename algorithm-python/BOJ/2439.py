n = int(input())

for i in range(n):
    temp = "*" * (i + 1)
    print(temp.rjust(n))

# 표준 입출력 ljust(자릿수) , rjust(자릿수) 