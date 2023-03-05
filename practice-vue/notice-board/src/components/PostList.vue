<template lang="">
    <div class="table__wrapper">
        <!--검색-->
        <div class="search__wrapper">
            <input type="text" v-model="search" class="searchInput" placeholder="게시글 제목을 입력해주세요"
                @keyup.enter="searchKeyword">
            <button type="button" class="searchBtn" @click="searchKeyword">
                <span>검색</span>
            </button>

            <button type="button" class="cancelBtn search" v-if="searchResult" @click="returnPost">
                <span>검색 취소</span>
            </button>

            <p class="error-context" v-if="searchError">검색어를 입력해주세요.</p>
        </div>

        <!--테이블-->
        <table class="board-table" cellpadding="0" cellspacing="0">
            <colgroup>
                <col width="4%" />
                <col width="*" />
                <col width="5%" />
                <col width="10%" />
            </colgroup>
            <tr>
                <th class="table-heading" colspan="2">제목</th>
                <th class="table-heading">작성자</th>
                <th class="table-heading">날짜</th>
            </tr>
            <!--현재 배열에 posts.id를 인덱스로 삼아 접근-->
            <tr v-for="posts in paginatedData" :key="posts.id">
                <td class="table-contents post-id">
                    <span class="table-contents-context">
                        {{posts.id}}
                    </span>
                </td>
                <td class="table-contents post-title">
                    <span class="table-contents-context title" @click="detailMoveto(`${posts.id}`)">
                        {{posts.title}}
                    </span>
                </td>
                <td class="table-contents post-userid">
                    <span class="table-contents-context">
                        {{posts.UserId}}
                    </span>
                </td>
                <td class="table-contents post-date">
                    <span class="table-contents-context">
                        {{posts.updatedAt}}
                    </span>
                </td>
            </tr>
            <!--어떤 데이터도 없을때(게시글이 없는 게시판에서)-->
            <tr v-if="posts.length == 0">
                <td class="table-contents no-post" colspan="4">
                    <span>데이터가 없습니다</span>
                </td>
            </tr>
        </table>

        <!--게시판 기능-->
        <div class="function__wrapper">
            <router-link to="/write" class="writeBtn">
                <span>글쓰기</span>
            </router-link>
        </div>

        <!--페이지네이션-->
        <div class="pagination">
            <button :disabled="pageNum === 0" v-if="this.pageSize != 0 && this.pageCount != 0" @click="prevPage"
                class="prevBtn">
                이전
            </button>

            <!--총 페이지 갯수 pageCount에 차례대로 접근하여 숫자 보이기-->
            <!--총 페이지 갯수 pageCount에 index(1~20)를 클릭 이벤트로 전달-->
            <ul class="page-count-list">
                <li class="page-count-listitem" v-for="(pages,i) in pageCount" :key="i" @click="movePage(i)"
                    :class="{ active: pageClick === i}">
                    <span @click="selectItem(i)">
                        {{pages}}
                    </span>
                </li>
            </ul>

            <button :disabled="pageNum >= pageCount - 1" v-if="this.pageSize != 0 && this.pageCount != 0"
                @click="nextPage" class="nextBtn">
                다음
            </button>
        </div>
    </div>
</template>

<script>
    export default {
        data: function () {
            return {
                // loginId:'genie',
                originList: [],
                posts: [],
                pageNum: 0,
                pageMax: 10,
                currentPage: 0,
                pageBlock: '',
                pageClick: 0,
                search: '',
                searchList: [],
                searchResult: false,
                searchError: false,
            }
        },
        props: {
            pageSize: { //한 페이지에 보여지게 될 포스트의 갯수
                type: Number,
                required: false,
                default: 10 //상위 컴포넌트(app)에서 어떤 값도 받지 않을 경우 10개가 기본으로 보여지게
            }
        },
        methods: {
            getData: function () { // axios 라이브러리로 데이터 접근
                var vm = this;
                this.axios.get('http://192.168.0.35:3000/posts')
                    .then(function (response) {
                        console.log(response.data);
                        vm.posts = response.data;
                        vm.originList = response.data;
                        //http://hong.adfeel.info/frontend/sort-%EB%B0%B0%EC%97%B4-%EC%A0%95%EB%A0%AC-reverse-%EB%B0%B0%EC%97%B4-%EB%92%A4%EC%A7%91%EA%B8%B0/
                        //최신순으로
                        vm.posts.reverse();
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            detailMoveto(i) {
                this.$router.push({
                    path: `/posts/${i}`
                });
                //클릭시 url 변경
                //https://router.vuejs.org/kr/guide/essentials/navigation.html
            },
            nextPage() { //페이지 넘버 증가
                this.pageClick += 1;
                this.pageNum += 1;
            },
            prevPage() { //페이지 넘버 감소
                this.pageClick -= 1;
                this.pageNum -= 1;
            },
            movePage(i) {
                //pageNum을 조정해야 페이지가 움직인다
                //pageNum은 기준 인덱스 0~20까지 
                //currentPage는 항상 0, 0에서 인덱스(1~20)을 더해서 현재 페이지 인덱스
                this.pageNum = this.currentPage + i;
            },
            pageIndex() {
                console.log('페이지 카운트', this.pageCount);
                console.log('보일 페이지 인덱스', this.pageNum);

                // this.pageNum>=10?
                // if(this.page >= 10){
                //     console.log(`전체 목록의 리스트는 ${this.page}입니다.`);
                // }
            },
            selectItem(i) { //페이지네이션 액티브 클래스
                this.pageClick = i;
                //https://medium.com/js-dojo/how-to-toggle-active-class-inside-v-for-2849dc54c40c
            },
            searchKeyword() {
                this.searchResult = true;
                this.searchError = false;
                //Array.prototype.filter()
                //filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
                //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

                //search에 뭔가 값이 입력되어있으면 
                if (this.search != '') {
                    //화살표 함수 쓰지 않을 경우
                    //array.filter(function(element){return data})
                    this.searchList = this.posts.filter(data => {
                        return data.title.includes(this.search);
                    });
                    console.log('검색된 결과는', this.searchList);
                    this.posts = this.searchList;
                } else {
                    this.searchResult = false;
                    this.searchError = true;
                }
            },
            returnPost() {
                this.searchResult = false;
                this.posts = this.originList;
            }

        },
        computed: {
            pageCount() {
                let postCount = this.posts.length; //총 200개의 포스트
                let pageSize = this.pageSize; //한 페이지에 10개씩
                console.log(postCount);
                let page = Math.ceil(postCount / pageSize);
                //전체 페이지는 20개
                //186개가 있을때 페이지는 18.6 -> 전체 페이지는 19페이지
                //올림 ceil사용
                //page = 전체 페이지의 갯수

                console.log('전체', page);

                return page;
            },
            paginatedData() { //한 페이지에 보일 갯수
                const start = this.pageNum * this.pageSize; // (i)*10 i가 0일땐 0부터
                const end = start + this.pageSize; // i+10 = 10 i+10이므로 그 직전 9까지 반환 총 10개가 보여진다 
                return this.posts.slice(start, end);
                //https://pewww.tistory.com/5
                //array.prototype.slice() https://im-developer.tistory.com/103
                //start : 추출 시작점에 대한 인덱스
                //end 추출을 종료할 기준 인덱스(end를 제외하고 그 전까지의 요소만 추출)
                //반환값: 추출한 요소를 포함한 새로운 배열
                //인덱스 start부터 end만큼 잘라서 posts에 다시 넣기

            }
        },
        mounted() { //로딩이 되자마자 해당 함수 실행
            this.getData(); //RESTapi로 값 가져오기
            this.pageIndex();
        }
    }
</script>

<style lang="scss">
    .table__wrapper {
        table-layout: fixed;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    /*검색창*/
    .search__wrapper {
        display: inline-flex;
        align-items: center;
        height: 36px;
        margin-bottom: 16px;
    }

    .searchInput {
        width: 230px;
        height: 100%;
        border-top: 1px solid #ddd;
        border-left: 1px solid #ddd;
        border-bottom: 1px solid #ddd;
        text-indent: 10px;
    }

    .searchInput::placeholder {
        color: #bbb;
    }

    .searchBtn {
        color: #fff;
        background-color: #000;
        padding: 2px 13px;
        height: 100%;
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
    }

    .search__wrapper .cancelBtn.search {
        display: inline-flex;
        width: fit-content;
        min-width: fit-content;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        border: none;
        padding: 0 5px;
    }

    .error-context {
        margin-left: 10px;
        font-size: 14px;
        color: rgb(245, 60, 60);
        cursor: default;
    }

    /*게시판*/
    .board-table {
        width: 100%;
    }

    .board-table th {
        white-space: nowrap;
    }

    .board-table td {
        height: 54px;
        border-bottom: 1px solid #d8d5d5;
    }

    .table-heading {
        background-color: #fff;
        border-top: 2px solid #000;
        border-bottom: 1px solid #000;
        font-size: 16px;
        font-weight: 600;
        height: 50px;
    }

    .table-contents-context {
        font-size: 13px;
    }


    .table-contents {
        text-align: center;
    }

    .table-contents.post-title {
        text-align: left;
    }

    .table-contents.no-post {
        height: 50px;
    }

    .table-contents .table-contents-context {
        cursor: default;
    }

    .table-contents.post-title .table-contents-context {
        cursor: pointer;
    }

    /*게시판 기능*/
    .function__wrapper {
        display: flex;
        align-items: center;
        margin-top: 18px;

    }

    .writeBtn {
        display: inline-flex;
        align-items: center;
        justify-content: center;

        /* background-color: #000;
        color: #fff;
        border-radius: 30px; */

        border: 1px solid #000;
        border-radius: 4px;


        min-width: 130px;
        padding: 0 20px;
        height: 36px;
        margin-left: auto;
    }


    /*페이지네이션 스타일*/
    .pagination {
        display: flex;
        align-items: center;
        justify-content: center;
        /* margin-top: 30px; */
        margin-top: 70px;
    }

    .prevBtn,
    .nextBtn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border-radius: 4px;
        background-color: #000;
        color: #fff;
        padding: 5px 20px;
    }

    .page-count-list {
        display: inline-flex;
    }

    .page-count-listitem {
        margin: 0 5px;
        border-radius: 4px;
        cursor: pointer;
    }

    .page-count-listitem span {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
        padding: 0 8px;
    }

    .page-count-listitem.active {
        color: orange;
    }
</style>