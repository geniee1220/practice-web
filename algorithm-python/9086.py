t = int(input())
arr = []

for i in range(t):
    value = input()
    arr.append(value[0] + value[-1])

for i in range(len(arr)):
    print(arr[i])

'''
더 깔끔하게 할 수 있는 방법은?
'''

'''
for i in range(int(input())):
    word = list(input())
    print(word[0],word[-1],sep="")
'''