<template>
    <el-table ref="table" :data="notes" style="width: 100%" border>
        <el-table-column align="center" label="ID" prop="id" width="150"/>
        <el-table-column align="center" type="expand" label="内容" width="150">
            <template #default="props">
                <div class="note-content">
                    <pre>{{ props.row.content }}</pre>
                </div>
            </template>
        </el-table-column>
        <el-table-column align="center" label="作者" prop="author.fullName"/>
        <el-table-column align="center" label="创建时间" prop="createTime"/>
        <el-table-column align="center" label="修改时间" prop="updateTime"/>
        <el-table-column align="center" label="操作" width="150">
            <template #default="scope">
                <el-dropdown trigger="click" @command="handleCommand($event, scope.row)">
                    <span class="el-dropdown-link">
                        <i class="el-icon-s-operation"></i>
                    </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="updateNote">编辑笔记</el-dropdown-item>
                            <el-dropdown-item command="deleteNote">删除笔记</el-dropdown-item>
                        </el-dropdown-menu>
                    </template>
                </el-dropdown>
            </template>
        </el-table-column>
    </el-table>
    <div class="pagination">
        <el-pagination background layout="prev, pager, next" :pager-count="5" :total="size" :page-size="10"
                       :hide-on-single-page="true" @current-change="handlePageChange">
        </el-pagination>
    </div>
    <el-dialog title="编辑笔记" v-model="dialogVisible" center>
        <el-form ref="note" :model="note" :rules="rules">
            <el-form-item prop="content">
                <el-input type="textarea" v-model.trim="note.content" :autosize="{minRows: 5, maxRows: 15}"/>
            </el-form-item>
            <el-form-item>
                <el-button class="button-long" type="primary" :loading="loading" @click="updateNote('note')" round>
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {deleteNote, getNotesOfCourse, updateNote} from '/@/utils/api'

export default {
    name: "Note-Manage",
    data() {
        return {
            note: {},
            notes: [],
            size: 0,
            pageNum: null,
            loading: false,
            dialogVisible: false,
            rules: {
                content: [
                    {required: true, message: '请输入内容', trigger: 'blur'},
                    {min: 2, message: '内容最少2个字符', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        this.getNotes()
    },
    methods: {
        getNotes() {
            getNotesOfCourse(this.$route.query.courseId, {pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.notes = result.data.list
                    this.size = result.data.size
                }
            })
        },
        updateNote(note) {
            this.$refs[note].validate((valid) => {
                if (valid) {
                    this.loading = true
                    updateNote(this.note).then(result => {
                        if (result.code === '0000') {
                            this.$message.success('更新成功！')
                        }
                    }).finally(() => this.loading = false)
                }
            })
        },
        deleteNote(row) {
            this.$confirm("确定删除？").then(() => {
                deleteNote(row.id).then(result => {
                    if (result.code === '0000') {
                        let index = this.notes.indexOf(row)
                        this.notes.splice(index, 1)
                        this.$message.success("删除成功！")
                    }
                }).catch(() => {
                    this.$message.warning("已取消！")
                })
            })
        },
        handleCommand(command, row) {
            switch (command) {
                case 'updateNote':
                    this.note = row
                    this.editMode = 'update'
                    this.dialogVisible = true
                    break
                case 'deleteNote':
                    this.deleteNote(row)
                    break
            }
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getNotes()
        }
    }
}
</script>

<style>
</style>