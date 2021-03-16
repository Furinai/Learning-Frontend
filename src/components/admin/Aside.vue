<template>
    <el-menu background-color="#304156" text-color="#BFCBD9" active-text-color="#409EFF" router unique-opened>
        <el-scrollbar>
            <el-menu-item index="0" :route="{name: 'Admin-Index'}">
                <template #title>
                    <i class="el-icon-house"></i>首页
                </template>
            </el-menu-item>
            <el-submenu index="1">
                <template #title>
                    <i class="el-icon-collection-tag"></i>分类
                </template>
                <el-menu-item index="1-1" :route="{name: 'Category-Manage'}">
                    分类管理
                </el-menu-item>
            </el-submenu>
            <el-submenu index="2">
                <template #title>
                    <i class="el-icon-reading"></i>课程
                </template>
                <el-menu-item index="2-1" :route="{name: 'Course-Manage'}">
                    课程管理
                </el-menu-item>
            </el-submenu>
            <el-submenu index="3">
                <template #title>
                    <i class="el-icon-user"></i>用户
                </template>
                <el-menu-item index="3-1" :route="{name: 'User-Manage'}">
                    用户管理
                </el-menu-item>
                <el-menu-item index="3-2" :route="{name: 'Role-Manage'}">
                    角色管理
                </el-menu-item>
            </el-submenu>
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