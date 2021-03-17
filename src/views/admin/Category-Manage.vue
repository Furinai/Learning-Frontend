<template>
    <div v-if="editMode === 'create' || editMode === 'update'">
        <el-form :model="category" :rules="rules" ref="category" label-width="80px">
            <el-form-item prop="name" label="名称">
                <el-input type="text" v-model="category.name" maxlength="20" show-word-limit/>
            </el-form-item>
            <el-form-item prop="parentId" label="父级">
                <el-select v-model="category.parentId" value-key="id">
                    <el-option label="无" value="0"/>
                    <el-option v-for="category in categories" :label="category.name" :value="category.id"/>
                </el-select>
            </el-form-item>
            <el-form-item class="text-right">
                <el-button size="small" @click="onSubmit('category')" type="primary" :loading="loading">
                    确认
                </el-button>
                <el-button size="small" @click="editMode = ''">取消</el-button>
            </el-form-item>
        </el-form>
    </div>
    <div v-else>
        <el-table ref="table" :data="categories" style="width: 100%" row-key="id" border>
            <el-table-column prop="name" label="名称" align="center" width="300"/>
            <el-table-column prop="createTime" label="创建时间" align="center"/>
            <el-table-column prop="updateTime" label="更新时间" align="center"/>
            <el-table-column label="操作" align="center" width="200">
                <template #header>
                    <el-button type="primary" size="mini" @click="createCategory">新增</el-button>
                </template>
                <template #default="scope">
                    <el-dropdown @command="handleCommand($event, scope.row)" trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-s-operation"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="updateCategory">编辑</el-dropdown-item>
                                <el-dropdown-item command="deleteCategory">删除</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
import {createCategory, deleteCategory, getCategories, updateCategory} from '/@/utils/api'
import {buildTree} from '/@/utils/processing'

export default {
    name: "Category-Manage",
    data() {
        return {
            category: {},
            categories: [],
            editMode: '',
            loading: false,
            rules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                ],
                parentId: [
                    {required: true, message: '请选择父级', trigger: 'change'}
                ]
            }
        }
    },
    created() {
        this.getCategories()
    },
    methods: {
        getCategories() {
            getCategories().then(result => {
                    if (result.code === '0000') {
                        this.categories = buildTree(result.data)
                    }
                }
            )
        },
        createCategory() {
            this.editMode = 'create'
            this.category = {}
        },
        updateCategory(row) {
            this.editMode = 'update'
            this.category = row
        },
        onSubmit(category) {
            this.$refs[category].validate((valid) => {
                if (valid) {
                    this.loading = true
                    if (this.editMode === 'create') {
                        createCategory(this.category).then(result => {
                            if (result.code === '0000') {
                                this.$message.success("新增成功！")
                                this.getCategories()
                            }
                        }).finally(() => this.loading = false)
                    }
                    if (this.editMode === 'update') {
                        updateCategory(this.category).then(result => {
                            if (result.code === '0000') {
                                this.$message.success("更新成功！")
                                this.getCategories()
                            }
                        }).finally(() => this.loading = false)
                    }
                }
            })
        },
        deleteCategory(row) {
            this.$confirm("确定删除？").then(() => {
                deleteCategory(row.id).then(result => {
                    if (result.code === '0000') {
                        let index = this.categories.indexOf(row)
                        this.categories.splice(index, 1)
                        this.$message.success("删除成功！")
                    }
                })
            }).catch(() => {
                this.$message.warning("已取消！")
            })
        },
        handleCommand(command, row) {
            switch (command) {
                case "updateCategory":
                    this.updateCategory(row)
                    break
                case "deleteCategory":
                    this.deleteCategory(row)
                    break
            }
        }
    }
}
</script>

<style>
</style>