<template>
    <el-table ref="table" :data="answers" style="width: 100%" border>
        <el-table-column align="center" label="ID" prop="id" width="150"/>
        <el-table-column align="center" type="expand" label="内容" width="200">
            <template #default="props">
                {{ props.row.content }}
            </template>
        </el-table-column>
        <el-table-column align="center" label="作者" prop="author.fullName"/>
        <el-table-column align="center" label="创建时间" prop="createTime"/>
        <el-table-column align="center" label="更新时间" prop="updateTime"/>
        <el-table-column align="center" label="操作" width="150">
            <template #default="scope">
                <el-dropdown trigger="click" @command="handleCommand($event, scope.row)">
                        <span class="el-dropdown-link">
                            <el-icon :size="20"><operation/></el-icon>
                        </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="updateAnswer">编辑答案</el-dropdown-item>
                            <el-dropdown-item command="deleteAnswer">删除答案</el-dropdown-item>
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
    <el-dialog title="编辑答案" v-model="dialogVisible" center>
        <el-form ref="answer" :model="answer" :rules="rules">
            <el-form-item>
                <el-input type="textarea" v-model.trim="answer.content" :autosize="{minRows: 4, maxRows: 10}"
                          placeholder="请输入内容" minlength="5" maxlength="500" show-word-limit/>
            </el-form-item>
            <el-form-item>
                <el-button class="button-long" type="primary" :loading="loading"
                           @click="updateAnswer('answer')" round>
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {deleteAnswer, getAnswersOfQuestion, updateAnswer} from '../../utils/api'

export default {
    name: "Answer-Manage",
    data() {
        return {
            answer: {},
            answers: [],
            size: 0,
            pageNum: null,
            loading: false,
            dialogVisible: false,
            rules: {
                content: [
                    {required: true, message: '请输入内容', trigger: 'blur'},
                    {min: 2, max: 1000, message: '长度在2到1000个字符', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        this.getAnswers()
    },
    methods: {
        getAnswers() {
            getAnswersOfQuestion(this.$route.query.questionId, {pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.answers = result.data.list
                    this.size = result.data.size
                }
            })
        },
        updateAnswer(answer) {
            this.$refs[answer].validate((valid) => {
                if (valid) {
                    this.loading = true
                    updateAnswer(this.answer).then(result => {
                        if (result.code === '0000') {
                            this.$message.success('更新成功！')
                        }
                    }).finally(() => this.loading = false)
                }
            })
        },
        deleteAnswer(row) {
            this.$confirm("确定删除？").then(() => {
                deleteAnswer(row.id).then(result => {
                    if (result.code === '0000') {
                        let index = this.answers.indexOf(row)
                        this.answers.splice(index, 1)
                        this.$message.success("删除成功！")
                    }
                }).catch(() => {
                    this.$message.warning("已取消！")
                })
            })
        },
        handleCommand(command, row) {
            switch (command) {
                case 'updateAnswer':
                    this.answer = row
                    this.editMode = 'update'
                    this.dialogVisible = true
                    break
                case 'deleteAnswer':
                    this.deleteAnswer(row)
                    break
            }
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getAnswers()
        }
    }
}
</script>

<style>
</style>