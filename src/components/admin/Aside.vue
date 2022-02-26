<template>
    <el-menu background-color="#304156" text-color="#BFCBD9" active-text-color="#409EFF" router unique-opened>
        <el-scrollbar>
            <el-menu-item index="0" :route="{name: 'Admin-Index'}">
                <template #title>
                    <el-icon>
                        <house/>
                    </el-icon>
                    首页
                </template>
            </el-menu-item>
            <el-sub-menu index="1">
                <template #title>
                    <el-icon>
                        <collection-tag/>
                    </el-icon>
                    分类
                </template>
                <el-menu-item index="1-1" :route="{name: 'Category-Manage'}">
                    分类管理
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <reading/>
                    </el-icon>
                    课程
                </template>
                <el-menu-item index="2-1" :route="{name: 'Course-Manage'}">
                    课程管理
                </el-menu-item>
            </el-sub-menu>
            <el-sub-menu index="3">
                <template #title>
                    <el-icon>
                        <user/>
                    </el-icon>
                    用户
                </template>
                <el-menu-item index="3-1" :route="{name: 'User-Manage'}">
                    用户管理
                </el-menu-item>
                <el-menu-item index="3-2" :route="{name: 'Role-Manage'}">
                    角色管理
                </el-menu-item>
            </el-sub-menu>
        </el-scrollbar>
    </el-menu>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "Admin-Aside",
    computed: mapState([
        'auth',
    ])
}
</script>