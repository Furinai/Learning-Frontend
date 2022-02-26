<template>
    <el-form :model="user" :rules="rules" ref="user" label-width="80px">
        <el-form-item prop="username" label="用户名">
            <el-input type="text" v-model="user.username" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item v-if="editMode === 'create'" prop="password" label="密码">
            <el-input type="password" v-model="user.password" maxlength="20"/>
        </el-form-item>
        <el-form-item v-else label="密码">
            <el-input type="password" v-model="user.password" maxlength="20"/>
        </el-form-item>
        <el-form-item prop="fullName" label="姓名">
            <el-input type="text" v-model="user.fullName" maxlength="10" show-word-limit/>
        </el-form-item>
        <el-form-item v-if="includeRole" prop="role" label="角色">
            <el-select v-model="user.role" value-key="id">
                <el-option v-for="role in roles" :label="role.name" :value="role"/>
            </el-select>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
            <el-radio-group v-model="user.gender">
                <el-radio label="男"></el-radio>
                <el-radio label="女"></el-radio>
            </el-radio-group>
        </el-form-item>
        <el-form-item prop="profilePicture" label="头像">
            <el-upload class="profile-picture-uploader" action="" :show-file-list="false"
                       :http-request="uploadProfilePicture">
                <el-avatar v-if="user.profilePicture" :size="100" :src="user.profilePicture">
                    {{ user.fullName }}
                </el-avatar>
                <el-icon class="avatar-uploader-icon">
                    <plus/>
                </el-icon>
            </el-upload>
        </el-form-item>
        <el-form-item prop="emailAddress" label="邮箱地址">
            <el-input type="text" v-model="user.emailAddress" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item prop="phoneNumber" label="电话号码">
            <el-input type="text" v-model="user.phoneNumber" maxlength="20" show-word-limit/>
        </el-form-item>
        <el-form-item class="text-right">
            <el-button size="small" @click="onSubmit('user')" type="primary" :loading="loading">
                确认
            </el-button>
            <el-button v-if="editMode" size="small" @click="onCancel">
                取消
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {createUser, getRoles, updateUser, uploadProfilePicture} from '../utils/api'

export default {
    name: "User-Form",
    props: [
        'user',
        'editMode',
        'includeRole',
        'separatePage'
    ],
    data() {
        return {
            roles: [],
            loading: false,
            rules: {
                username: [
                    {required: true, min: 2, max: 20, message: '用户名长度在 2 到 20 个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, min: 6, max: 20, message: '密码长度在 62 到 20 个字符', trigger: 'blur'}
                ],
                fullName: [
                    {required: true, min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur'}
                ],
                role: [
                    {required: true, message: '请选择角色', trigger: 'change'}
                ],
                gender: [
                    {required: true, message: '请选择性别', trigger: 'change'}
                ],
                profilePicture: [
                    {required: true, message: '请上传头像', trigger: 'change'}
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
        if (this.includeRole) {
            this.getRoles()
        }
    },
    methods: {
        getRoles() {
            getRoles().then(result => {
                if (result.code === '0000') {
                    this.roles = result.data
                }
            })
        },
        onSubmit(user) {
            this.$refs[user].validate((valid) => {
                if (valid) {
                    this.loading = true
                    if (this.editMode === 'create') {
                        createUser(this.user).then(result => {
                            if (result.code === '0000') {
                                this.$refs[user].resetFields()
                                this.$message.success("新增成功！")
                            }
                        }).finally(() => this.loading = false)
                    }
                    if (this.editMode === 'update') {
                        updateUser(this.user).then(result => {
                            if (result.code === '0000') {
                                this.$message.success("更新成功！")
                            }
                        }).finally(() => this.loading = false)
                    }
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
        onCancel() {
            if (this.separatePage) {
                this.$router.back()
            } else {
                this.$emit('cancel')
            }
        }
    }
}
</script>

<style>
.is-error .profile-picture-uploader > .el-upload {
    border: 1px dashed #F56C6C;
}

.profile-picture-uploader .el-upload {
    height: 100px;
    border-radius: 6px;
    border: 1px dashed #D9D9D9;
}

.profile-picture-uploader .el-icon-plus {
    font-size: 32px;
    color: #8c939d;
    width: 100px;
    line-height: 100px;
}
</style>