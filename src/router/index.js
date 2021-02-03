import store from '/@/store'
import {createRouter, createWebHistory} from 'vue-router'
import {ElMessage} from 'element-plus'
import Portal from '/@/layout/Portal.vue'

const routes = [
    {
        path: '/',
        name: 'Portal',
        component: Portal,
        children: [
            {
                path: '/',
                name: 'Index',
                component: () => import('/@/views/Index.vue')
            },
            {
                path: '/login',
                name: 'Login',
                component: () => import('/@/views/Login.vue')
            },
            {
                path: '/register',
                name: 'Register',
                component: () => import('/@/views/Register.vue')
            }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: () => import('/@/layout/Admin.vue'),
        children: [
            {
                path: '/',
                name: 'Admin-Index',
                component: () => import('/@/views/admin/Index.vue')
            }
        ]
    },
    {
        path: '/:pathMatch(.*)',
        component: () => import('/@/views/NotFound.vue')
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from) => {
    if (to.meta.requiresAuth) {
        if (!store.state.auth) {
            router.push({name: 'Login'})
            return false
        }
        if (to.meta.role !== store.state.auth.role) {
            ElMessage.error("没有访问权限")
        }
    }
})

export default router