<template>
    <el-table ref="table" :data="roles" style="width: 100%" border>
        <el-table-column prop="id" label="ID" align="center" width="200"/>
        <el-table-column prop="name" label="名称" align="center" width="300"/>
        <el-table-column prop="createTime" label="创建时间" align="center"/>
        <el-table-column prop="updateTime" label="更新时间" align="center"/>
        <el-table-column label="操作" align="center" width="200">
            <template #header #default="scope">
                <el-button type="primary" size="small" @click="createRole">新增</el-button>
            </template>
            <template #default="scope">
                <el-dropdown @command="handleCommand($event, scope.row)" trigger="click">
                        <span class="el-dropdown-link">
                            <el-icon :size="20"><operation/></el-icon>
                        </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="updateRole">编辑</el-dropdown-item>
                            <el-dropdown-item command="deleteRole">删除</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </el-table-column>
    </el-table>
</template>

<script>
import {createRole, deleteRole, getRoles, updateRole} from '../../utils/api'

export default {
    name: "Role-Manage",
    data() {
        return {
            roles: []
        }
    },
    created() {
        this.getRoles()
    },
    methods: {
        getRoles() {
            getRoles({}).then(result => {
                if (result.code === '0000') {
                    this.roles = result.data
                }
            })
        },
        createRole() {
            this.$prompt('请输入名称', '新增角色', {
                inputPattern: /^.{1,20}$/,
                inputErrorMessage: '名称应为1-20个字符'
            }).then(({value}) => {
                createRole({name: value}).then(result => {
                    if (result.code === '0000') {
                        this.$message.success('新增成功！')
                        this.getRoles()
                    }
                })
            }).catch(() => {
                this.$message.warning('已取消重命名！')
            })
        },
        updateRole(row) {
            this.$prompt('请输入名称', '修改角色', {
                inputValue: row.name,
                inputPattern: /^.{1,20}$/,
                inputErrorMessage: '名称应为1-20个字符'
            }).then(({value}) => {
                updateRole({id: row.id, name: value}).then(result => {
                    if (result.code === '0000') {
                        row.name = value
                        this.$message.success('修改成功！')
                    }
                })
            }).catch(() => {
                this.$message.warning('已取消重命名！')
            })
        },
        deleteRole(row) {
            this.$confirm("确定删除？").then(() => {
                deleteRole(row.id).then(result => {
                    if (result.code === '0000') {
                        let index = this.roles.indexOf(row)
                        this.roles.splice(index, 1)
                        this.$message.success("删除成功！")
                    }
                })
            }).catch(() => {
                this.$message.warning("已取消！")
            })
        },
        handleCommand(command, row) {
            switch (command) {
                case "updateRole":
                    this.updateRole(row)
                    break
                case "deleteRole":
                    this.deleteRole(row)
                    break
            }
        }
    }
}
</script>

<style>
</style>