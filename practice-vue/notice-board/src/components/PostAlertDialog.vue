<template>
    <div class="modal__wrapper">
        <div class="modal-popup alert">
            <p class="popup-context">게시글이 등록되었습니다.</p>
            <button class="closeBtn" @click="listMoveto">
                <span>확인</span>
            </button>
        </div>
        <div class="modal-overlay"></div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
               
            }
        },
        methods: {
            listMoveto:function(){
                this.$router.push({
                    path:'/'
                });
            }
        },
    }
</script>

<style>
.modal__wrapper{
    position:fixed;
    top:0;
    left:0;
    right:0;
    bottom:0;
    z-index:1000;
}
.modal-popup{
    position:absolute;
    top:50%;
    left:50%;
    transform:translate(-50%, -50%);
    width:400px;
    padding:30px 16px;
    background-color:#fff;
    border-radius:4px;
}
.modal-popup.alert{
    display: flex;
    flex-wrap:wrap;
}
.popup-context{
    display:block;
    width:100%;
    font-weight:500;
    font-size:18px;
    text-align:center;
}
.closeBtn{
    min-width:120px;
    height:48px;
    background-color:#000;
    color:#fff;
    border-radius:30px;
    margin: 30px auto 0;
}
.modal-overlay{
    width:100%;
    height:100%;
    background-color:rgba(0,0,0,0.6);
}

</style>