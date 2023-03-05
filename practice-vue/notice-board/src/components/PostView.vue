<template>
    <div class="detail__wrapper">
        <form action="">
            <table class="post-table" cellpadding="0" cellspacing="0">
                <colgroup>
                    <col width="140px">
                    <col width="*">
                </colgroup>
                <tr>
                    <td class="post-table-heading">
                        작성자
                    </td>
                    <td class="post-table-contents">
                        <span>{{userId}}</span>
                    </td>
                </tr>
                <tr>
                    <td class="post-table-heading">
                        작성일
                    </td>
                    <td class="post-table-contents">
                        <span>{{date}}</span>
                    </td>
                </tr>

                <tr>
                    <td class="post-table-heading">
                        제목
                    </td>
                    <td class="post-table-contents">
                        {{title}}
                    </td>
                </tr>
                <tr class="post-contents">
                    <td class="post-table-heading">
                        내용
                    </td>
                    <td class="post-table-contents" v-html="content"></td>
                </tr>
            </table>
        </form>
        <!--소유자가 로그인(genie)일때-->
        <div class="owner-function__wrapper">
            <button type="button" v-if="loginStatus" class="editBtn" @click="postEdit(`${this.$route.params.id}`)">
                수정
            </button>
            <button type="button" v-if="loginStatus" class="deleteBtn" @click="postDelete">
                삭제
            </button>
        </div>
        <div class="writeForm-function">
            <router-link to="/">
                <span class="listBtn">목록으로</span>
            </router-link>
        </div>
    </div>
    <Post-Delete-Alert v-if="deleteStatus" @cancelDelete="cancelDelete"></Post-Delete-Alert>
</template>
<script>
    import PostDeleteAlert from '@/components/PostDeleteDialog.vue'
    export default {
        components:{
            'Post-Delete-Alert':PostDeleteAlert
        },
        data() {
            return {
                paramsId:'',
                loginId: 'genie',
                loginStatus: false,
                title: '',
                content: '',
                userId: '',
                date: '',
                deleteStatus:false
            }
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
            },
            postDelete:function(){
                this.deleteStatus = true;  
            },
            cancelDelete:function(){
                this.deleteStatus = false;
            },
            postEdit:function(i){
                this.$router.push({
                    path: `/edit/${i}`
                });
            }
        },
        mounted() {
            this.getData();
        }
    }
</script>
<style lang="scss">
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

    .post-table-info {
        display: flex;
        align-items: center;
        margin-bottom: 3px;
    }

    .post-table-info .post-author {
        display: inline-block;
        font-size: 15px;
    }

    .post-table-info .post-date {
        display: inline-block;
        font-size: 15px;
        margin-left: 4px;
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

    .listBtn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        background-color: #000;
        border-radius: 30px;
        height: 46px;
        min-width: 160px;
        margin: 30px auto 0;
        font-size: 15px;
        color: #fff;
    }

    /*작성자*/
    .owner-function__wrapper{
        display: flex;
        align-items: center;
        justify-content:flex-end;
        width:100%;
        margin-top:20px;
        .editBtn{
            border-radius:4px;
            border:1px solid #000;
            padding:5px 20px;
        }
        .deleteBtn{
            border-radius:4px;
            border:1px solid #000;
            padding:5px 20px;
            margin-left:10px;
        }

        .edit-cancelBtn{
            border-radius:4px;
            border:1px solid #000;
            padding:5px 20px;
            // background-color:#000;
            color:#000;
        }

        .edit-confirmBtn{
            border-radius:4px;
            border:1px solid #000;
            padding:5px 20px;
            // background-color:#000;
            color:#000;
            margin-left:10px;
        }

    }
</style>