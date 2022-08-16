<template>
    <div class="search__wrapper">
        <input type="text" v-model="search" class="searchInput" placeholder="게시글 제목을 입력해주세요">
        <button type="button" class="searchBtn" @click="searchKeyword">
            <span>검색</span>
        </button>
    </div>
</template>

<script>
    export default {
        props: ['boardData'],
        data: function () {
            return {
                search: '',
                searchList:[],
            }
        },
        methods: {
            searchKeyword(){
                //Array.prototype.filter()
                //filter() 메서드는 주어진 함수의 테스트를 통과하는 모든 요소를 모아 새로운 배열로 반환합니다.
                //https://developer.mozilla.org/ko/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

                //search에 뭔가 값이 입력되어있으면 
                if(this.search != ''){
                    console.log(this.boardData);
                    //화살표 함수 쓰지 않을 경우
                    //array.filter(function(element){return data})
                    this.searchList = this.boardData.filter(data => {
                        return data.title.includes(this.search);
                    });
                    console.log('검색된 결과는',this.searchList);
                    this.$emit("searchList",this.searchList);
                }
            }
        },

    }
</script>

<style>
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
</style>