<template>
    <el-row type="flex" justify="space-between">
        <el-col :span="12">
            <el-row type="flex">
                <router-link class="logo" :to="{name: 'Index'}">
                    Linter
                </router-link>
                <router-link :to="{name: 'Index'}">
                    <el-icon>
                        <house/>
                    </el-icon>
                    首页
                </router-link>
                <router-link :to="{name: 'Course-List'}">
                    <el-icon>
                        <files/>
                    </el-icon>
                    课程
                </router-link>
            </el-row>
        </el-col>
        <el-col :span="12">
            <el-row v-if="auth" type="flex" justify="end">
                <router-link :to="{name: 'Course-Search'}">
                    <el-icon>
                        <search/>
                    </el-icon>
                    搜索
                </router-link>
                <router-link v-if="auth.role.name !== '学生'" :to="{name: 'Teaching-Course-List'}">
                    <el-icon>
                        <suitcase/>
                    </el-icon>
                    教学管理
                </router-link>
                <router-link v-if="auth.role.name === '管理员'" :to="{name: 'Admin-Index'}">
                    <el-icon>
                        <monitor/>
                    </el-icon>
                    后台管理
                </router-link>
                <el-popover placement="bottom-end" :width="200">
                    <template #reference>
                        <el-button type="text" class="ml-2 mt-1">
                            <el-avatar :src="auth.profilePicture" :size="32" class="profile-picture">
                            </el-avatar>
                        </el-button>
                    </template>
                    <div class="user-popover">
                        <el-avatar :src="auth.profilePicture" :size="64">
                            {{ auth.fullName }}
                        </el-avatar>
                        <div class="mt-1">
                            {{ auth.fullName }}
                        </div>
                        <div class="mt-2">
                            <router-link :to="{ name: 'User-Homepage', params: { username: auth.username }}">
                                <el-icon>
                                    <user/>
                                </el-icon>
                                个人主页
                            </router-link>
                            <el-divider direction="vertical"/>
                            <router-link :to="{ name: 'User-Setting', params: { username: auth.username }}">
                                <el-icon>
                                    <setting/>
                                </el-icon>
                                个人设置
                            </router-link>
                            <el-divider/>
                            <el-button type="text" @click="logout">安全退出</el-button>
                        </div>
                    </div>
                </el-popover>
            </el-row>
            <el-row v-else type="flex" justify="end">
                <router-link :to="{name: 'Course-Search'}">
                    <el-icon>
                        <search/>
                    </el-icon>
                    搜索
                </router-link>
                <router-link :to="{name: 'Login'}">
                    <el-icon>
                        <user/>
                    </el-icon>
                    登录
                </router-link>
            </el-row>
        </el-col>
    </el-row>
</template>

<script>
import {mapState} from 'vuex'
import {removeAuth, removeToken} from '../utils/auth'

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
                    this.$router.push({name: 'Login'})
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