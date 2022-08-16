<template>
    <div class="modal__wrapper">
        <div class="modal-popup delete">
            <p class="popup-context">정말로 삭제하시겠습니까?</p>
            <div>
                <button type="button" @click="cancelDelete" class="delete-cancelBtn">
                    <span>삭제 취소</span>
                </button>
                <button type="button" class="delete-confirmBtn" @click="postDelete">
                    <span>삭제</span>
                </button>
            </div>
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
            cancelDelete: function () {
                this.$emit('cancelDelete');
            },
            postDelete: function () {
                const postAddress = this.$route.params.id;
                console.log(postAddress);

                this.axios.delete('http://192.168.0.35:3000/posts/' + postAddress)
                    .then(function (response) {
                        // handle success
                        console.log(response);
                    })
                    .catch(function (error) {
                        // handle error
                        console.log(error);
                    })
                
                this.$router.push({
                    path:'/'
                });
            }
        },
    }
</script>

<style lang="scss">
    .modal__wrapper {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 1000;
    }

    .modal-popup {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 400px;
        padding: 30px 16px;
        background-color: #fff;
        border-radius: 4px;
    }

    .modal-popup.delete {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;

        .delete-cancelBtn {
            min-width: 120px;
            height: 42px;
            background-color: #fff;
            color: #000;
            border: 1px solid #000;
            border-radius: 4px;
            margin: 30px 10px 0;
        }

        .delete-confirmBtn {
            min-width: 120px;
            height: 42px;
            background-color: #000;
            color: #fff;
            border-radius: 4px;
            margin: 30px 10px 0;
        }

    }

    .popup-context {
        display: block;
        width: 100%;
        font-weight: 500;
        font-size: 18px;
        text-align: center;
    }

    .modal-overlay {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.6);
    }
</style>