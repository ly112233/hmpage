import VueRouter from 'vue-router'
import Vue from 'vue'

import login from '@/views/login/login.vue'
import layout from '@/views/layout/layout'
import chart from '@/views/chart/chart'
import userList from '@/views/userList/userList'
import question from '@/views/question/question'
import business from '@/views/business/business'
import subject from '@/views/subject/subject'

Vue.use(VueRouter)
const router = new VueRouter({
    routes: [
        {
            path: '/',
            redirect: 'login'
        },
        {
            path: "/login",
            component: login
        },
        {
            path: "/layout",
            component: layout,
            redirect:'chart',
            children: [
                { path: '/chart', component: chart },
                { path: '/userList', component: userList },
                { path: '/question', component: question },
                { path: '/business', component: business },
                { path: '/subject', component: subject },

            ]
        },
    ]
})
// export {router}
export default router