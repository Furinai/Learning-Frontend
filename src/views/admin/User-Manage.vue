<template>
    <div v-if="editMode === 'create' || editMode === 'update'">
        <UserForm :user="user" :editMode="editMode" @cancel="handleCancel" includeRole="true"/>
    </div>
    <div v-else>
        <el-table ref="table" :data="users" style="width: 100%" border>
            <el-table-column align="center" label="ID" prop="id" width="80"/>
            <el-table-column align="center" label="头像" width="80">
                <template #default="scope">
                    <el-avatar :src="scope.row.profilePicture" size="small"/>
                </template>
            </el-table-column>
            <el-table-column align="center" label="用户名" prop="username" width="100"/>
            <el-table-column align="center" label="姓名" prop="fullName" width="100"/>
            <el-table-column align="center" label="性别" prop="gender" width="100"/>
            <el-table-column align="center" label="角色" prop="role.name" width="100"/>
            <el-table-column align="center" label="手机号码" prop="phoneNumber" width="150"/>
            <el-table-column align="center" label="邮箱地址" prop="emailAddress" width="150"/>
            <el-table-column align="center" label="创建时间" prop="createTime" width="150"/>
            <el-table-column align="center" label="更新时间" prop="updateTime" width="150"/>
            <el-table-column align="center" label="操作">
                <template #header>
                    <el-button size="mini" type="primary" @click="createUser">新增</el-button>
                </template>
                <template #default="scope">
                    <el-dropdown trigger="click" @command="handleCommand($event, scope.row)">
                        <span class="el-dropdown-link">
                            <i class="el-icon-s-operation"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="updateUser">编辑</el-dropdown-item>
                                <el-dropdown-item command="deleteUser">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination :hide-on-single-page="true" :pager-count="5" :total="size" background
                           layout="prev, pager, next" @current-change="handlePageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {deleteUser, getUsers} from '../../utils/api'
import UserForm from '../../components/User-Form.vue'

export default {
    name: "User-Manage",
    components: {UserForm},
    data() {
        return {
            user: {},
            users: [],
            size: 0,
            editMode: null,
            pageNum: null
        }
    },
    created() {
        this.getUsers()
    },
    methods: {
        getUsers() {
            getUsers({pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.users = result.data.list
                    this.size = result.data.size
                }
            })
        },
        createUser() {
            this.user = {}
            this.editMode = 'create'
        },
        updateUser(row) {
            this.user = row
            this.editMode = 'update'
        },
        deleteUser(row) {
            this.$confirm("确定删除？").then(() => {
                deleteUser(row.id).then(result => {
                    if (result.code === '0000') {
                        let index = this.users.indexOf(row)
                        this.users.splice(index, 1)
                        this.$message.success("删除成功！")
                    }
                }).catch(() => {
                    this.$message.warning("已取消！")
                })
            })
        },
        handleCommand(command, row) {
            switch (command) {
                case 'updateUser':
                    this.updateUser(row)
                    break
                case 'deleteUser':
                    this.deleteUser(row)
                    break
            }
        },
        handleCancel() {
            this.editMode = null
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getUsers()
        }
    }
}
</script>

<style>
</style>