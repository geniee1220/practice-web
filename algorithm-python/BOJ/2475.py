arr = list(map(int, input().split()))

num = 0

for i in range(len(arr)):
    num += arr[i] ** 2

print(num % 10)
