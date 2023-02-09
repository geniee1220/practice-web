while True:
    word = input()
    if word == "#":
        break

    cnt = 0
    for i in ["a", "e", "i", "o", "u", "A", "E", "I", "O", "U"]:
        cnt += word.count(i)
    print(cnt)