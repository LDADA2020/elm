import Vue from "vue"
import VueRouter from 'vue-router'
Vue.use(VueRouter)


const router = new VueRouter({
    mode: 'history',
    routes: [

        // },
        // {
        //     path: '/search',
        //     component: () =>
        //         import ('../views/search/index.vue')
        // },
        // {
        //     path: '/audio',
        //     component: () =>
        //         import ('../views/audio/index.vue')
        // },
        // {
        //     path: '/login',
        //     component: () =>
        //         import ('../views/login/index.vue')
        // },
        // {
        //     path: '/deng',
        //     component: () =>
        //         import ('../views/login/deng.vue')
        // },
        // {
        //     path: '/register',
        //     component: () =>
        //         import ('../views/register/index.vue')
        // },
        // {
        //     path: 'audio/:id',
        //     component: () =>
        //         import ('../views/audio/index.vue'),
        // },
    ],
    linkActiveClass: 'active'
})
export default router