<template>
  <div class="board__wrapper">
    <Post-Header></Post-Header>

    <div class="container">
      <router-view />
    </div>

  </div>
</template>



<script>
  // import axios from 'axios'
  import PostHeader from './components/PostHeader.vue'
  // import PostList from './components/PostList.vue'
  // import VueRouter from 'vue-router';
  export default {
    data: function () {
      return {
        users: []
      }
    },
    components: {
      'Post-Header': PostHeader,
      // 'Post-List': PostList,
    },
    methods: {

    }
  }
</script>

<style>
  .board__wrapper {
    padding: 34px 54px;
  }
</style>