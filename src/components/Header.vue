<template>
    <el-row type="flex" justify="space-between">
        <el-col :span="12">
            <el-row type="flex">
                <router-link class="logo" :to="{name: 'Index'}">
                    Linter
                </router-link>
                <router-link :to="{name: 'Index'}">
                    <i class="el-icon-house"/>首页
                </router-link>
                <router-link :to="{name: 'Course-List'}">
                    <i class="el-icon-files"/>课程
                </router-link>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row type="flex" justify="end">
                <a v-if="auth" href="javascript:" @click="logout">
                    <i class="el-icon-user"/>注销
                </a>
                <router-link v-else :to="{name: 'Login'}">
                    <i class="el-icon-user"/>登录
                </router-link>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import {mapState} from 'vuex'
import {removeAuth, removeToken} from '/@/utils/auth'

export default {
    name: "Header",
    computed: mapState([
        "auth"
    ]),
    methods: {
        logout() {
            this.$confirm("确定注销？", "提示", {type: "warning"}).then(() => {
                    removeAuth()
                    removeToken()
                    this.$router.push({name: "Login"})
                }
            ).catch(() => {
                this.$message.warning("已取消！")
            })
        }
    },
}
</script>

<style>
.logo {
    color: #333;
    font-size: 20px;
    font-weight: bold;
}
</style>