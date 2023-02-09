while True:
    a, b = list(map(int, input().split()))
    if a > b: 
        print("Yes")
    elif (a < b) or (a == b != 0):
        print("No")
    elif a == 0 and b == 0:
        break

'''
while True로 무한 루프 처리 가능!
아래 코드로 좀 더 깔끔하게 처리 가능

while True:
    n, m = map(int, input().split())

    if (n == 0) and (m == 0):
        break

    elif (n > m):
        print("Yes")

    else:
        print("No")

'''