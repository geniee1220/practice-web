<template>
    <div class="detail__wrapper">
        <form action="" v-on:submit="submitForm" id="writeForm">
            <table class="post-table" cellpadding="0" cellspacing="0">
                <colgroup>
                    <col width="140px">
                    <col width="*">
                </colgroup>
                <tr>
                    <td class="post-table-heading">
                        제목
                    </td>
                    <td class="post-table-contents">
                        <input class="table-input" type="text" :value="title" @input="title=$event.target.value" spellcheck="false">
                    </td>
                </tr>
                <tr class="post-contents">
                    <td class="post-table-heading">
                        내용
                    </td>
                    <td class="post-table-contents">
                        <textarea class="table-textarea" :value="content" @input="content=$event.target.value" spellcheck="false"></textarea>
                    </td>
                </tr>
            </table>
        </form>
        <div class="writeForm-function">
            <span class="cancelBtn" @click="postView">취소</span>
            <button type="submit" @click="dateCount" class="submitBtn" form="writeForm">수정 완료</button>
        </div>
    </div>
    <Post-Alert v-if="modalStatus"></Post-Alert>
</template>
<script>
    import PostAlert from '@/components/PostAlertDialog.vue'
    export default {
        data() {
            return {
                title: '',
                content: '',
                date: '',
                userId:'',
                modalStatus:false
            }
        },
        components:{
            'Post-Alert':PostAlert
        },
        methods: {
            getData: function () {
                const postAddress = this.$route.params.id;
                this.paramsId = this.$route.params.id;
                console.log(this.paramsId);
                console.log(postAddress);
                //url 파라미터 저장
                //http://yoonbumtae.com/?p=3185
                var vm = this;
                this.axios.get('http://192.168.0.35:3000/posts/' + postAddress)
                    .then(function (response) {
                        console.log(response.data);
                        vm.title = response.data.title;
                        vm.content = response.data.content.replace(/(\n)/g, '<br/>');
                        vm.userId = response.data.UserId;
                        vm.date = response.data.createdAt;

                        if (vm.loginId == response.data.UserId) {
                            vm.loginStatus = true;
                        }
                    })
                    .catch(function (error) {
                        console.log(error);
                    });

                    //https://eddie2yim.tistory.com/48
            },
            submitForm: function (event) {
                let vm = this;
                event.preventDefault();
                console.log(this.title, this.content);
                let url = "http://192.168.0.35:3000/posts/" + this.$route.params.id;
                let data = {
                    title: this.title,
                    content: this.content,
                    createdAt: this.date,
                    updatedAt: this.date,
                    UserId: this.userId,
                };
                
                if(this.userId !='' && this.title != '' && this.contents != ''){
                    this.axios.put(url, data)
                    .then(function (response) {
                        console.log(response);
                    })
                    .catch(function (error) {
                        console.log(error);
                    })
                    .then(function(){
                        vm.modalStatus = true;
                    })
                }else{
                   alert('모든 칸을 빠짐없이 입력해주세요');
                }
            },
            dateCount: function () {
                let preventDate = new Date();


                let mm = ((preventDate.getMonth() + 1) < 10 ? '0' : '') + (preventDate.getMonth() + 1);
                let dd = (preventDate.getDate() < 10 ? '0' : '') + preventDate.getDate();
                //자바스크립트 연산
                // https://stackoverflow.com/questions/6040515/how-do-i-get-month-and-date-of-javascript-in-2-digit-format
                // getDate() returns the day of the month (from 1-31)
                // getMonth() returns the month (from 0-11) < zero-based, 0=January, 11=December
                // getFullYear() returns the year (four digits) < don't use getYear()

                this.date = preventDate.getFullYear() + "." + mm + "." + dd;

                console.log(this.date);
            },
            postView:function(){
                const postAddress = this.$route.params.id;
                this.$router.push({
                    path: '/posts/' + postAddress
                });
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>
<style>
    .detail__wrapper {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        width: 100%;
        max-width: 1200px;
        margin: 0 auto;
    }

    .detail__wrapper form {
        width: 100%;
    }

    .post-table {
        width: 100%;
        border-top: 2px solid #000;
    }

    .post-table td {
        min-height: 50px;
        padding: 10px;
        border-bottom: 1px solid #ddd;
        vertical-align: top;
        font-size: 15px;
    }

    .post-contents {
        letter-spacing: -0.8px;
        font-size: 14px;
        line-height: 1.8;
        height: 500px;
    }

    .post-table-heading {
        font-weight: 600;
        text-align: center;
    }

    .table-input {
        width: 100%;
        height: 100%;
        font-size: 15px;
    }

    .table-textarea {
        width: 100%;
        height: 500px;
        font-size: 15px;
        resize: none;
        border: none;
    }

    .writeForm-function{
        display: inline-flex;
        align-items: center;
        margin: 30px auto 0;
    }
    .cancelBtn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        border:1px solid #000;
        background-color: #fff;
        border-radius: 30px;
        height: 46px;
        min-width: 160px;
        margin:0 10px;
        font-size: 15px;
        color:#000;
        cursor:pointer;
    }
    .submitBtn{
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        border-radius: 30px;
        height: 46px;
        min-width: 160px;
        margin:0 10px;
        font-size: 15px;
        color: #fff;
    }
</style>