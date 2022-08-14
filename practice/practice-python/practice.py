## int
print(5)
print(3.14)
print(1000)
print(5+3)
print(5*2)
print(3*(3+1))

## string
print('풍선')
print('ㅋ'*5)


## boolean
print(5 > 10)
print(5 < 10)
print(True)
print(False)
print(not True)
print(not False)
print(not (5>10) ) # True


## variation
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



## Quiz
station = '사당'
print(station, '행 열차가 들어오고 있습니다.')
station = '신도림'
print(station, '행 열차가 들어오고 있습니다.')
station = '인천공항'
print(station, '행 열차가 들어오고 있습니다.')



## etc
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


## 숫자처리 함수
print(abs(-5)) # 5 절대값을 반환해줌
print(pow(4,2)) # 4^2 = 4*4 = 16
print(max(5,12)) # 비교해서 큰 값 반환 12
print(min(5,12)) # 비교해서 작은 값 반환 5 
print(round(3.14)) # 반올림 반환 3
print(round(4.99)) # 반올림 반환 5


## math 라이브러리 사용
from math import * 
print(floor(4.99)) # 내림 반환 4
print(ceil(3.14)) # 올림 반환 4
print(sqrt(16)) # 제곱근 반환 4


## random 라이브러리 사용
from random import *
print(random()) # 0.0 ~ 1.0 미만의 임의의 값 생성
print(random()*10) # 0.0 ~ 10.0 미만의 임의의 값 생성

print(int(random()*10)) # 0부터 10 미만의 임의의 정수 생성
print(int(random()*10) + 1) # 1부터 10 이하의 임의의 정수 생성

print(int(random()*45) + 1) # 1 ~ 45 이하의 임의의 값 생성

print(randrange(1,45)) # 1~45 미만의 임의의 값 생성
print(randrange(1,46)) # 1~45 이하의 임의의 값 생성

print(randint(1,45)) # 1~45 이하의 임의의 값 생성 



## Quiz
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



## sentence 
sentence = '나는 유진입니다.'
print(sentence)

sentence2 = "파이썬은 쉬워요"
print(sentence2)

sentence3 = """
    여러줄로 쓸 수도 있어요
    바로 이렇게
"""


## slicing
number = "940131-1234567"

print("성별:",number[7]) # 2
print("연:",number[0:2]) # 0부터 2번째 자리 직전까지(0,1)
print("월:",number[2:4])
print("일:",number[4:6])

print("생년월일:",number[:6]) # 처음부터 6번째 자리 직전까지
print("주민등록번호 7자리",number[7:]) # 7번째 자리부터 마지막까지
print("주민등록 7자리(뒤에서부터)",number[-7:]) # 맨 뒤에서 7번째 자리부터 끝까지



## 문자열 처리 함수
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



## 문자열 포맷 

# 방법 1
print("나는 %d살입니다." % 20) # %d는 정수값만 집어넣을 수 있다.
print("나는 %s을 좋아해요" % "파이썬") # %s 는 다 받아올 수 있다.
print("Apple 은 %c로 시작해요" % "A") # %c는 단 한가지 문자만 받는다

print("나는 %s색과 %s색을 좋아해요." % ("파란","빨간"))

# 방법 2
print("나는 {}살입니다".format(20))
print("나는 {}색과 {}색을 좋아해요.".format("파란","빨간"))
print("나는 {0}색과 {1}색을 좋아해요.".format("파란","빨간"))
print("나는 {1}색과 {0}색을 좋아해요.".format("파란","빨간"))

# 방법 3
print("나는 {age}살이며, {color}색을 좋아해요.".format(age = 29, color = "파란"))

# 방법 4 (파이썬 버전 v3.6~)
age = 29
color = "파란"
print(f"나는 {age}살이며, {color}색을 좋아해요.")



## 탈출 문자

# \n : 줄바꿈
print("백문이 불여일견\n백견이 불여일타")

# \" \' 은 문자로 취급
print("저는 \"나도코딩\"입니다.")
print("저는 \'나도코딩\'입니다.")

# \\ : 문장 내에서 \로 사용
print("practice\\practice-algorithm") # 경로를 사용할 때 사용 -> 출력 : practice\practice-algorithm

# \r : 커서를 맨 앞으로 이동후 입력
print("Red Apple\rPine")

# \b : 백스페이스 (한 글자 삭제)
print("Redd\bApple")

# \t : 탭
print("Red\tApple")



## QUIZ
'''
    사이트별로 비밀번호를 만들어주는 프로그램을 작성하시오
    
    예) http://naver.com
    규칙 1: http:// 부분은 제외 => naver.com
    규칙 2: 처음 만나는 점(.)이후 부분은 제외 => naver
    규칙 3: 남은 글자 중 처음 세자리 + 글자 갯수 + 글자 내 'e'갯수 + "!"로 구성
    생성된 비밀번호 : nav51!
'''

siteUrl = "http://naver.com"
password = ""

site = siteUrl.replace("http://","")
index = site.index(".")
site = site[:index]

password += site[:3] 
password += str(len(site))
password += str(siteUrl.count("e"))
password += "!"

print(site)
print("비밀번호",password)

print("{0}의 비밀번호는 {1} 입니다.".format(siteUrl, password))


'''
풀이

url = "http://naver.com"
my_str = url.replace("http://","")

 my_str이라는 문자열 중에, 처음부터 처음 나오는 . 전까지 슬라이싱
 my_str[0:5]과 동일
my_str = my_str[:my_str.index(".")]

password = my_str[:3] + str(len(my_str)) + str(count(my_str)) + "!"

'''



## 리스트 []  = javascript array

# 지하철 칸별로 10명, 20명, 30명 
subway = [10,20,30]
print(subway)

# 유진이는 몇 번째 칸에 타고 있나요?
subway = ["유진","슬기","이나"]
print(subway.index("유진"))

# 민영이가 다음 정류장에서 다음 칸에 탔다면
subway.append("민영")
print(subway)

# 다빈이가 슬기와 이나 사이에 탔다면
subway.insert(2, "다빈") # 다빈이랑 2번째 인덱스로 삽입
print(subway) 

# 지하철에 있는 사람이 한 명씩 뒤에서 내림 
print(subway.pop())
print(subway)

# 같은 이름의 사람이 몇 명 있는지 확인하기
subway.append("슬기")
print(subway)
print(subway.count("슬기"))



## 리스트(배열) 정렬 
num_list = [5,2,4,3,1]
num_list.sort() 
print(num_list) # [1,2,3,4,5]

num_list.reverse() # 순서뒤집기
print(num_list) # [5,4,3,2,1]

num_list.clear() # 지우기
print(num_list) # []

mix_list = ["유진",29,True]
print(mix_list)

num_list.extend(mix_list) # 배열 확장



## 사전 .. 오브젝트 {key:내용} 
cabinet = {3:"슬기", 100:"유진"}
print(cabinet[3])
print(cabinet.get(3))

# print(cabinet[5]) error를 발생시키고 종료
# print(cabinet.get(5)) None을 리턴
# print(cabinet.get(5,"사용 가능")) None대신 "사용 가능"을 리턴

print(3 in cabinet) # 3번 key가 cabinet 변수에 존재하는지 확인 , 존재 시 True 없을 경우 False