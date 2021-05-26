<template>
    <div class="box-card box-middle">
        <el-card>
            <template #header>
                <div class="card-title">注册</div>
            </template>
            <el-form ref="user" :model="user" :rules="rules">
                <el-form-item prop="emailAddress">
                    <el-input type="email" v-model="user.emailAddress" placeholder="邮箱"/>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input type="text" v-model="user.username" placeholder="用户名"/>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input type="password" v-model="user.password" placeholder="密码"/>
                </el-form-item>
                <el-form-item>
                    <el-button class="button-long" type="primary" @click="onSubmit('user')" :loading="loading" round>
                        注册
                    </el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
import {registerUser} from '/@/utils/api'

export default {
    name: 'Register',
    data() {
        return {
            user: {
                emailAddress: '',
                username: '',
                password: ''
            },
            rules: {
                emailAddress: [
                    {type: 'email', required: true, message: '请输入正确的邮箱', trigger: 'blur'}
                ],
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 2, max: 10, message: '长度在2到10个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 6, max: 20, message: '长度在6到20个字符', trigger: 'blur'}
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
                    registerUser(this.user).then(result => {
                        if (result.code === '0000') {
                            this.$message.success("注册成功！")
                            this.$router.push({name: 'Login'})
                        }
                    }).finally(() =>
                        this.loading = false
                    )
                }
            })
        }
    }
}
</script>