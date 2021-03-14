<template>
    <el-form :model="user" :rules="rules" ref="user" label-width="80px">
        <el-form-item prop="username" label="用户名">
            <el-input type="text" v-model="user.username" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item prop="password" label="密码">
            <el-input type="password" v-model="user.password" maxlength="20"/>
        </el-form-item>
        <el-form-item prop="fullName" label="姓名">
            <el-input type="text" v-model="user.fullName" maxlength="10" show-word-limit/>
        </el-form-item>
        <el-form-item label="性别">
            <el-radio-group v-model="user.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item label="头像">
            <el-upload class="avatar-uploader" action="" :show-file-list="false" :http-request="uploadProfilePicture">
                <el-avatar :size="100" :src="user.profilePicture" class="avatar">
                    {{ user.fullName }}
                </el-avatar>
            </el-upload>
        </el-form-item>
        <el-form-item prop="emailAddress" label="邮箱地址">
            <el-input type="text" v-model="user.emailAddress" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="电话号码">
            <el-input type="text" v-model="user.phoneNumber" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item class="text-right">
            <el-button size="small" @click="updateUser('user')" type="primary" :loading="loading">
                确认
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {getUser, updateUser, uploadProfilePicture} from '/@/utils/api'

export default {
    name: "User-Setting",
    data() {
        return {
            username: this.$route.params.username,
            user: {},
            loading: false,
            rules: {
                username: [
                    {required: true, min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                ],
                password: [
                    {min: 6, max: 20, message: '长度在 6 到 20 个字符', trigger: 'blur'}
                ],
                fullName: [
                    {required: true, min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                ],
                emailAddress: [
                    {required: true, type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur'}
                ],
                phoneNumber: [
                    {required: true, pattern: /^1[3-9]\d{9}$/, message: '请输入正确的手机号码', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        this.getUser()
    },
    methods: {
        getUser() {
            getUser(this.username).then(result => {
                if (result.code === '0000') {
                    this.user = result.data
                    this.user.password = null
                }
            })
        },
        uploadProfilePicture(params) {
            let formData = new FormData()
            formData.append('multipartFile', params.file)
            uploadProfilePicture(formData).then(result => {
                if (result.code === '0000') {
                    this.$message.success('上传成功！')
                    this.user.profilePicture = result.data
                }
            })
        },
        updateUser(user) {
            this.$refs[user].validate((valid) => {
                if (valid) {
                    this.loading = true
                    updateUser(this.user).then(result => {
                        if (result.code === '0000') {
                            this.$message.success('更新成功！')
                        }
                    }).finally(() => this.loading = false)
                }
            })
        }
    }
}
</script>

<style>
.avatar {
    width: 100px;
    height: 100px;
    display: block;
}
</style>