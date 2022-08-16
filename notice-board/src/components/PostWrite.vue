<template>
    <div class="detail__wrapper">
        <form action="" v-on:submit="submitForm" id="writeForm">
            <table class="post-table" cellpadding="0" cellspacing="0">
                <colgroup>
                    <col width="100px">
                    <col width="*">
                </colgroup>
                <tr>
                    <td class="post-table-heading">
                        작성자
                    </td>
                    <td class="post-table-contents">
                        <input class="table-input" type="text" v-model="userId">
                    </td>
                </tr>
                <tr>
                    <td class="post-table-heading">
                        제목
                    </td>
                    <td class="post-table-contents">
                        <input class="table-input" type="text" v-model="title">
                    </td>
                </tr>
                <tr class="post-contents">
                    <td class="post-table-heading">
                        내용
                    </td>
                    <td class="post-table-contents">
                        <textarea class="table-textarea" v-model="content"></textarea>
                    </td>
                </tr>
            </table>
        </form>
        <div class="writeForm-function">
            <router-link to="/">
                <span class="cancelBtn">취소</span>
            </router-link>
            <button type="submit" @click="dateCount" class="submitBtn" form="writeForm">작성 완료</button>
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
            submitForm: function (event) {
                let vm = this;
                event.preventDefault();
                console.log(this.title, this.content);
                let url = "http://192.168.0.35:3000/posts";
                let data = {
                    title: this.title,
                    content: this.content,
                    createdAt: this.date,
                    updatedAt: this.date,
                    UserId: this.userId,
                };
                
                if(this.userId !='' && this.title != '' && this.contents != ''){
                    this.axios.post(url, data)
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
            }
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