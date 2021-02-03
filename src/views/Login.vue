<template>
    <div class="box-card box-middle">
        <el-card>
            <template #header>
                <div class="card-title">登录</div>
            </template>
            <el-form ref="user" :model="user" :rules="rules">
                <el-form-item prop="username">
                    <el-input v-model="user.username" placeholder="用户名" type="text"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input v-model="user.password" placeholder="密码" type="password"
                              @keyup.enter.native="onSubmit('user')"/>
                </el-form-item>
                <el-form-item>
                    <router-link :to="{name: 'Register'}">
                        注册账号
                    </router-link>
                </el-form-item>
                <el-form-item>
                    <el-button class="button-long" type="primary" @click="onSubmit('user')" :loading="loading" round>
                        登录
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {getAuthUser} from "../utils/api";
import {setAuth, setToken} from "../utils/auth";
import axios from "axios";

export default {
    name: 'Login',
    data() {
        return {
            user: {},
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'}
                ]
            },
            loading: false
        }
    },
    methods: {
        onSubmit(user) {
            this.$refs[user].validate((valid) => {
                if (valid) {
                    this.loading = true
                    let auth = {username: 'linter', password: 'linter'}
                    let params = new URLSearchParams()
                    params.append('grant_type', 'password')
                    params.append('username', this.user.username)
                    params.append('password', this.user.password)
                    axios.post('/api/oauth/token', params, {auth}).then(response => {
                        let data = response.data
                        setToken(data.token_type + ' ' + data.access_token)
                        getAuthUser().then(result => {
                            if (result.code === '0000') {
                                setAuth(result.data)
                                this.$router.push({name: "Index"})
                            }
                        })
                    }).catch(error => {
                        this.$message.error(error.response.data.error_description)
                    }).finally(() =>
                        this.loading = false
                    )
                }
            })
        }
    }
}
</script>