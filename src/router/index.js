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
import CategoryManage from '/@/views/admin/Category-Manage.vue'
import CourseManage from '/@/views/admin/Course-Manage.vue'
import UserManage from '/@/views/admin/User-Manage.vue'
import RoleManage from '/@/views/admin/Role-Manage.vue'
import NotFound from '/@/views/NotFound.vue'

const routes = [
    {
        path: '',
        name: 'Portal',
        component: Portal,
        children: [
            {
                path: '',
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
                component: UserSetting,
                meta: {
                    authRequired: true
                }
            },
            {
                path: '/teaching/course/list',
                name: 'Teaching-Course-List',
                component: TeachingCourseList,
                meta: {
                    authRequired: true,
                    rolePermitted: ['教师', '管理员']
                }
            },
            {
                path: '/teaching/course/create',
                name: 'Teaching-Course-Create',
                component: TeachingCourseCreate,
                meta: {
                    authRequired: true,
                    rolePermitted: ['教师', '管理员']
                }
            },
            {
                path: '/teaching/course/update',
                name: 'Teaching-Course-Update',
                component: TeachingCourseUpdate,
                meta: {
                    authRequired: true,
                    rolePermitted: ['教师', '管理员']
                }
            },
            {
                path: '/teaching/chapter/list',
                name: 'Teaching-Chapter-List',
                component: TeachingChapterList,
                meta: {
                    authRequired: true,
                    rolePermitted: ['教师', '管理员']
                }
            },
            {
                path: '/teaching/chapter/create',
                name: 'Teaching-Chapter-Create',
                component: TeachingChapterCreate,
                meta: {
                    authRequired: true,
                    rolePermitted: ['教师', '管理员']
                }
            },
            {
                path: '/teaching/chapter/update',
                name: 'Teaching-Chapter-Update',
                component: TeachingChapterUpdate,
                meta: {
                    authRequired: true,
                    rolePermitted: ['教师', '管理员']
                }
            }
        ]
    },
    {
        path: '/admin',
        name: 'Admin',
        component: Admin,
        meta: {
            authRequired: true,
            rolePermitted: ['管理员']
        },
        children: [
            {
                path: '',
                name: 'Admin-Index',
                component: AdminIndex
            },
            {
                path: 'category/manage',
                name: 'Category-Manage',
                component: CategoryManage
            },
            {
                path: 'course/manage',
                name: 'Course-Manage',
                component: CourseManage
            },
            {
                path: 'user/manage',
                name: 'User-Manage',
                component: UserManage
            },
            {
                path: 'role/manage',
                name: 'Role-Manage',
                component: RoleManage
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

router.beforeEach((to) => {
    if (to.meta.authRequired) {
        if (!store.state.auth) {
            return {name: 'Login', query: {redirect: to.fullPath}}
        }
        if (to.meta.rolePermitted) {
            let roleName = store.state.auth.role.name
            if (to.meta.rolePermitted.indexOf(roleName) === -1) {
                ElMessage.error("没有访问权限")
                return false
            }
        }
    }
})

export default router