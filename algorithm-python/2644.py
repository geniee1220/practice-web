string = str(input())
arr = []

for i in range(len(string)):
    if string[i].isupper():
        convert = string[i].lower()
    else:
        convert = string[i].upper()
    arr.append(convert)

print(*arr, sep="")


'''
다른 풀이법! 

a = input()
print(a.swapcase())

swapcase는 대문자를 소문자로, 소문자를 대문자로 바꿔주는 함수이다

'''