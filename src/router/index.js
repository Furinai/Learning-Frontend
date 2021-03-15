import store from '/@/store'
import {createRouter, createWebHistory} from 'vue-router'
import {ElMessage} from 'element-plus'
import Portal from '/@/layout/Portal.vue'
import Index from '/@/views/Index.vue'
import Login from '/@/views/Login.vue'
import Register from '/@/views/Register.vue'
import CourseList from '/@/views/Course-List.vue'
import CourseContent from '/@/views/Course-Content.vue'
import QuestionContent from '/@/views/Question-Content.vue'
import UserHomepage from '/@/views/User-Homepage.vue'
import UserSetting from '/@/views/User-Setting.vue'
import TeachingCourseList from '/@/views/teaching/Course-List.vue'
import TeachingCourseCreate from '/@/views/teaching/Course-Create.vue'
import TeachingCourseUpdate from '/@/views/teaching/Course-Update.vue'
import TeachingChapterList from '/@/views/teaching/Chapter-List.vue'
import TeachingChapterCreate from '/@/views/teaching/Chapter-Create.vue'
import TeachingChapterUpdate from '/@/views/teaching/Chapter-Update.vue'
import Admin from '/@/layout/Admin.vue'
import AdminIndex from '/@/views/admin/Index.vue'
import NotFound from '/@/views/NotFound.vue'

const routes = [
    {
        path: '/',
        name: 'Portal',
        component: Portal,
        children: [
            {
                path: '/',
                name: 'Index',
                component: Index
            },
            {
                path: '/login',
                name: 'Login',
                component: Login
            },
            {
                path: '/register',
                name: 'Register',
                component: Register
            },
            {
                path: '/courses',
                name: 'Course-List',
                component: CourseList
            },
            {
                path: '/courses/:id',
                name: 'Course-Content',
                component: CourseContent
            },
            {
                path: '/questions/:id',
                name: 'Question-Content',
                component: QuestionContent
            },
            {
                path: '/users/:username',
                name: 'User-Homepage',
                component: UserHomepage
            },
            {
                path: '/users/:username/setting',
                name: 'User-Setting',
                component: UserSetting
            },
            {
                path: '/teaching/course/list',
                name: 'Teaching-Course-List',
                component: TeachingCourseList
            },
            {
                path: '/teaching/course/create',
                name: 'Teaching-Course-Create',
                component: TeachingCourseCreate
            },
            {
                path: '/teaching/course/update',
                name: 'Teaching-Course-Update',
                component: TeachingCourseUpdate
            },
            {
                path: '/teaching/chapter/list',
                name: 'Teaching-Chapter-List',
                component: TeachingChapterList
            },
            {
                path: '/teaching/chapter/create',
                name: 'Teaching-Chapter-Create',
                component: TeachingChapterCreate
            },
            {
                path: '/teaching/chapter/update',
                name: 'Teaching-Chapter-Update',
                component: TeachingChapterUpdate
            }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        children: [
            {
                path: '/',
                name: 'Admin-Index',
                component: AdminIndex
            }
        ]
    },
    {
        path: '/:pathMatch(.*)',
        component: NotFound
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