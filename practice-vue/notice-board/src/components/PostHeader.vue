<template>
    <div class="board-header">
        <h1 class="board-heading">
            <router-link to="/">
                테스트 게시판
            </router-link>
        </h1>
    </div>
</template>

<script>
    export default {

    }
</script>

<style>
    .board-header{
        display: flex;
        align-items: center;
        max-width: 1200px;
        margin: 0 auto 24px;
    }
    .board-heading {
        width:fit-content;
        font-size: 28px;
        font-weight: 600;
    }
</style>