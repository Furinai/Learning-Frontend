<template>
    <el-table ref="table" :data="questions" style="width: 100%" border>
        <el-table-column align="center" label="ID" prop="id" width="100"/>
        <el-table-column align="center" type="expand" label="内容" width="100">
            <template #default="props">
                {{ props.row.content }}
            </template>
        </el-table-column>
        <el-table-column align="center" label="标题" prop="title"/>
        <el-table-column align="center" label="作者" prop="author.fullName" width="150"/>
        <el-table-column align="center" label="回答数量" prop="answerCount" width="150"/>
        <el-table-column align="center" label="创建时间" prop="createTime" width="150"/>
        <el-table-column align="center" label="更新时间" prop="updateTime" width="150"/>
        <el-table-column align="center" label="操作" width="150">
            <template #default="scope">
                <el-dropdown trigger="click" @command="handleCommand($event, scope.row)">
                        <span class="el-dropdown-link">
                            <el-icon :size="20"><operation/></el-icon>
                        </span>
                    <template #dropdown>
                        <el-dropdown-menu>
                            <el-dropdown-item command="updateQuestion">编辑问题</el-dropdown-item>
                            <el-dropdown-item command="deleteQuestion">删除问题</el-dropdown-item>
                            <el-dropdown-item command="manageAnswer">管理答案</el-dropdown-item>
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
    <el-dialog title="编辑问题" v-model="dialogVisible" center>
        <el-form ref="question" :model="question" :rules="rules">
            <el-form-item prop="title">
                <el-input v-model="question.title" placeholder="标题" type="text"/>
            </el-form-item>
            <el-form-item prop="content">
                <el-input type="textarea" v-model="question.content" placeholder="内容"/>
            </el-form-item>
            <el-form-item>
                <el-button class="button-long" type="primary" :loading="loading"
                           @click="updateQuestion('question')" round>
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {deleteQuestion, getQuestionsOfCourse, updateQuestion} from '../../utils/api'

export default {
    name: "Question-Manage",
    data() {
        return {
            question: {},
            questions: [],
            size: 0,
            pageNum: null,
            loading: false,
            dialogVisible: false,
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'},
                    {min: 2, max: 50, message: '长度在2到50个字符', trigger: 'blur'}
                ],
                content: [
                    {required: true, message: '请输入内容', trigger: 'blur'},
                    {min: 2, max: 1000, message: '长度在2到1000个字符', trigger: 'blur'}
                ]
            }
        }
    },
    created() {
        this.getQuestions()
    },
    methods: {
        getQuestions() {
            getQuestionsOfCourse(this.$route.query.courseId, {pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.questions = result.data.list
                    this.size = result.data.size
                }
            })
        },
        updateQuestion(question) {
            this.$refs[question].validate((valid) => {
                if (valid) {
                    this.loading = true
                    updateQuestion(this.question).then(result => {
                        if (result.code === '0000') {
                            this.$message.success('更新成功！')
                        }
                    }).finally(() => this.loading = false)
                }
            })
        },
        deleteQuestion(row) {
            this.$confirm("确定删除？").then(() => {
                deleteQuestion(row.id).then(result => {
                    if (result.code === '0000') {
                        let index = this.questions.indexOf(row)
                        this.questions.splice(index, 1)
                        this.$message.success("删除成功！")
                    }
                }).catch(() => {
                    this.$message.warning("已取消！")
                })
            })
        },
        handleCommand(command, row) {
            switch (command) {
                case 'updateQuestion':
                    this.question = row
                    this.editMode = 'update'
                    this.dialogVisible = true
                    break
                case 'deleteQuestion':
                    this.deleteQuestion(row)
                    break
                case 'manageAnswer':
                    this.$router.push({name: 'Answer-Manage', query: {questionId: row.id}})
                    break
            }
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getQuestions()
        }
    }
}
</script>

<style>
</style>