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
                <el-popover v-if="auth" placement="bottom-end" :width="200">
                    <template #reference>
                        <el-avatar :src="auth.profilePicture" :size="32" class="profile-picture">
                            {{ auth.fullName }}
                        </el-avatar>
                    </template>
                    <div class="user-popover">
                        <el-avatar :src="auth.profilePicture" :size="64">
                            {{ auth.fullName }}
                        </el-avatar>
                        <div class="mt-1">
                            {{ auth.fullName }}
                        </div>
                        <div class="mt-2">
                            <router-link :to="{ name: 'User-Home', params: { username: auth.username }}">
                                <i class="el-icon-user"/>个人主页
                            </router-link>
                            <el-divider direction="vertical"/>
                            <router-link :to="{ name: 'User-Home', params: { username: auth.username }}">
                                <i class="el-icon-setting"/>个人设置
                            </router-link>
                            <el-divider/>
                            <el-button type="text" @click="logout">安全退出</el-button>
                        </div>
                    </div>
                </el-popover>
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
        'auth'
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

.profile-picture {
    margin-top: 15px;
}

.user-popover {
    text-align: center;
}

.user-popover a {
    color: #303133;
}

.user-popover .el-button {
    min-height: 20px;
    padding: 0;
}

.user-popover .el-button--text {
    color: #303133;
}

.user-popover .el-divider--horizontal {
    margin: 12px 0;
}
</style>