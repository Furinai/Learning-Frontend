import store from '/@/store'
import {createRouter, createWebHistory} from 'vue-router'

import Admin from '/@/layout/Admin.vue'
import Index from '/@/views/Index.vue'
import Login from '/@/views/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: '/',
                name: 'Index',
                component: Index
            }
        ]
    },
    {
        path: '/login',
        name: 'login',
        component: Login
    },
    {
        path: '/:pathMatch(.*)',
        component: Index
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    if (to.name !== 'login') {
        if (!store.state.auth) {
            router.push({name: 'login'})
            return false
        }
    }
})

export default router