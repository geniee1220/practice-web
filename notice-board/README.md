# board

## Vue.js 게시판 구현

프로젝트 소요 시간 : 3일 (2021.06.28 - 2021.06.30)
프로젝트 기여도 : 기획 100% , 디자인 100%, 프론트엔드 100%

프로젝트 목표 : 예제 코드를 분석하여 Vue.js를 통해 만들고 싶은 모양으로 게시판을 구현한다.

- Axios, Router을 실제로 사용해 본다.
- 예제 코드를 분석한다. 주석이 있는 경우 주석을 참조한다.

※ Data : [https://jsonplaceholder.typicode.com/posts](https://jsonplaceholder.typicode.com/posts) 혹은 json-server로 프로토타이핑 Rest API를구축하여 사용

### 기술 스택

- Vue 3
- Vue Router
- SASS(SCSS)
- json-server

### 구현 기능

- 페이지리스트 / 페이지네이션
  -- Axios 라이브러리를 사용, 게시판 데이터를 받아와 페이지네이션을 구현

- 상세 페이지 / 라우터
  -- URL 파라미터를 통해 데이터에 접근하여 상세 페이지를 작성하고, CRUD 기능을 구현

- 검색(필터링) : 게시판 데이터 필터링 및 필터 초기화
  -- 목표 : Axios로 데이터를 가져온 후, 원본 데이터를 필터링하여 새 배열로 반환

- 다이얼로그 : 공통 알럿 다이얼로그 생성
  -- 목표 : 하위 컴포넌트인 다이얼로그에서 emit으로 이벤트를 발생, data의 불린 값을 변경
