// import Vue from 'vue';
// import Router from 'vue-router';

import { createWebHistory, createRouter } from 'vue-router'
import PostList from './components/PostList.vue'
import PostView from './components/PostView.vue'
import PostWrite from './components/PostWrite.vue'
import PostEdit from './components/PostEdit.vue'

// Vue.use(Router)

// export default new Router({
//     mode: history, //history 모드는 자연스러운 url 가능, 지정하지 않으면 해시(#)기호로 url 사용 
//     routes: [
//         {
//             path:'/post', //해당 페이지의 url
//             component: Post //해당 url에서 표시될 컴포넌트
//         }
//     ]
// })


const routes = [
    {
        path:'/',
        name:'board',
        component: PostList
    },
    {
        path: '/posts/:id',
        name: 'post',
        component: PostView
    },
    {
        path: '/write',
        name: 'write',
        component: PostWrite
    },
    {
        path: '/edit/:id',
        name: 'edit',
        component: PostEdit
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router