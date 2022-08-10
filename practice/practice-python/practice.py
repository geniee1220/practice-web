# int
print(5)
print(3.14)
print(1000)
print(5+3)
print(5*2)
print(3*(3+1))

# string
print('풍선')
print('ㅋ'*5)


# boolean
print(5 > 10)
print(5 < 10)
print(True)
print(False)
print(not True)
print(not False)
print(not (5>10) ) # True


# variation
animal = "햄스터"
name = "마노"
is_cute = name == '마노'

# var01 - 애완동물을 소개해 주세요
print("우리집 " + animal + "의 이름은 " + name)
animal = "고양이"

'''쉼표로 구분해줄 때는 str 이런거 쓰지 않아도 그대로 사용할 수 있음
쉼표로 쓸 때는 띄어쓰기가 무조건 하나씩 포함됨'''
# print(animal + "는 귀엽나요?")
print(animal, "는 귀엽나요?") 

# boolean 값을 print에 쓰려면 문자열로 바꿔주기 
print(str(is_cute)) 



# Quiz
station = '사당'
print(station, '행 열차가 들어오고 있습니다.')
station = '신도림'
print(station, '행 열차가 들어오고 있습니다.')
station = '인천공항'
print(station, '행 열차가 들어오고 있습니다.')


# etc
print(2**3) # 2^3 = 8 (2의 3승)
print(5%3) # 나머지 구하기 2
print(10%3) # 나머지 구하기 1
print(5//3) # 몫 구하기 1
print(10>3) # True
print(4>=7) # False
print(10<3) # False
print(5<=5) # True
print(3==3) # True
print(1!=3) # True
print(not(1!=3)) # False
print((3>0) and (3<5)) # and 는 && 조건
print((3>0) & (3<5))

print((3>0) or (3<5)) # or은 || 조건
print((3>0) | (3<5))

print(5>4>3)
print(5>4>7)

number = 2 + 3 * 4 # 14
print(number)

number = number + 2 # 16
print(number)

number += 2 # 18
print(number)

number *= 2 # 36
print(number)

number /= 2 
print(number) # 18

number -= 2 
print(number) # 16

number %= 2 # 0 나머지값
number %= 5 # 1 나머지값


# 숫자처리 함수
print(abs(-5)) # 5 절대값을 반환해줌
print(pow(4,2)) # 4^2 = 4*4 = 16
print(max(5,12)) # 비교해서 큰 값 반환 12
print(min(5,12)) # 비교해서 작은 값 반환 5 
print(round(3.14)) # 반올림 반환 3
print(round(4.99)) # 반올림 반환 5

# math 라이브러리 사용
from math import * 
print(floor(4.99)) # 내림 반환 4
print(ceil(3.14)) # 올림 반환 4
print(sqrt(16)) # 제곱근 반환 4


# random 라이브러리 사용
from random import *
print(random()) # 0.0 ~ 1.0 미만의 임의의 값 생성
print(random()*10) # 0.0 ~ 10.0 미만의 임의의 값 생성

print(int(random()*10)) # 0부터 10 미만의 임의의 정수 생성
print(int(random()*10) + 1) # 1부터 10 이하의 임의의 정수 생성

print(int(random()*45) + 1) # 1 ~ 45 이하의 임의의 값 생성

print(randrange(1,45)) # 1~45 미만의 임의의 값 생성
print(randrange(1,46)) # 1~45 이하의 임의의 값 생성

print(randint(1,45)) # 1~45 이하의 임의의 값 생성 


# Quiz
'''
    당신은 최근에 코딩 스터디 모임을 새로 만들었습니다.
    월 4회 스터디를 하는데 3번은 온라인으로 하고 1번은 오프라인으로 하기로 했습니다.
    아래 조건에 맞는 오프라인 모임 날짜를 정해주는 프로그램을 작성하시오.

    조건 1 : 랜덤으로 날짜를 뽑아야 함
    조건 2 : 월별 날짜는 다름을 감안하여 최소 일수인 28 이내로 정함
    조건 3 : 매월 1~3일은 스터디 준비를 해야 하므로 제외
'''

from random import *
date = randint(4,28)
print('오프라인 스터디 모임 날짜는 매월',str(date),'일로 선정되었습니다.')


#sentence 
sentence = '나는 유진입니다.'
print(sentence)

sentence2 = "파이썬은 쉬워요"
print(sentence2)

sentence3 = """
    여러줄로 쓸 수도 있어요
    바로 이렇게
"""

#slicing
number = "940131-1234567"

print("성별:",number[7]) # 2
print("연:",number[0:2]) # 0부터 2번째 자리 직전까지(0,1)
print("월:",number[2:4])
print("일:",number[4:6])

print("생년월일:",number[:6]) # 처음부터 6번째 자리 직전까지
print("주민등록번호 7자리",number[7:]) # 7번째 자리부터 마지막까지
print("주민등록 7자리(뒤에서부터)",number[-7:]) # 맨 뒤에서 7번째 자리부터 끝까지


# 문자열 처리 함수
python = "Python is Amazing"
print(python.lower()) # 소문자로
print(python.upper()) # 대문자로
print(python[0].isupper()) # 첫번째 글자가 대문자인지 확인하는 함수
print(len(python)) # 문자열의 길이를 반환 
print(python.replace("python", "Java")) # 파이썬에서 Java 문자열을 찾아서 python으로 변경

index = python.index("n") # index 문자열의 인덱스값을 찾아주는 함수
print(index)
index = python.index("n", index + 1) # 앞에서 찾은 위치 다음부터... (두번째 인자는 스타트 위치!)
print(index)

print(python.find("Java")) # 문자열이 존재하지 않을 경우 -1을 반환해줌 , index 는 그냥 에러를 내도록 함 

print(python.count("n")) # n이 총 몇 개 있는지 확인
