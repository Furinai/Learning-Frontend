<template>
    <div class="flex-between mt-1 mb-1">
        <el-button type="primary" size="mini" @click="openDialog" plain round>
            新问题
        </el-button>
        <el-radio-group v-model="orderBy" size="mini" @change="handleOrderChange">
            <el-radio-button label="create_time">最新</el-radio-button>
            <el-radio-button label="answer_count">最热</el-radio-button>
        </el-radio-group>
    </div>
    <ul>
        <li v-for="question in questions" class="question">
            <div class="flex-start">
                <el-avatar :src="question.author.profilePicture">
                    {{ question.author.fullName }}
                </el-avatar>
                <div class="question-info">
                    <div class="flex-between">
                        <div class="user-name">
                            <router-link :to="{ name: 'User-Home', params: { username: question.author.username }}">
                                {{ question.author.fullName }}
                            </router-link>
                        </div>
                        <div class="answer-count">
                            <i class="el-icon-chat-line-square"/>
                            {{ question.answerCount }}
                        </div>
                    </div>
                    <div class="create-time">
                        {{ question.createTime }}
                    </div>
                    <div class="question-title">
                        <router-link :to="{ name: 'Question-Content', params: { id: question.id }}">
                            {{ question.title }}
                        </router-link>
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <div class="pagination">
        <el-pagination background layout="prev, pager, next" :pager-count="5" :total="size" :page-size="20"
                       :hide-on-single-page="true" @current-change="handlePageChange">
        </el-pagination>
    </div>
    <el-dialog title="新问题" v-model="dialogVisible" center>
        <el-form ref="question" :model="question" :rules="rules">
            <el-form-item prop="title">
                <el-input v-model="question.title" placeholder="标题" type="text"/>
            </el-form-item>
            <el-form-item prop="content">
                <el-input type="textarea" v-model="question.content" placeholder="内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button-long" type="primary" @click="createQuestion('question')"
                           :loading="loading" round>
                    发布
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {mapState} from 'vuex'
import {createQuestion, getQuestionsOfCourse} from '/@/utils/api'

export default {
    name: "Course-Question",
    props: [
        'id'
    ],
    data() {
        return {
            questions: [],
            size: 0,
            orderBy: 'create_time',
            pageNum: null,
            dialogVisible: false,
            question: {},
            loading: false,
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
    computed: mapState([
        "auth"
    ]),
    created() {
        this.getQuestions()
    },
    methods: {
        getQuestions() {
            getQuestionsOfCourse(this.id, {orderBy: this.orderBy, pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.questions = result.data.list
                    this.size = result.data.size
                }
            })
        },
        createQuestion(question) {
            this.$refs[question].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.question.courseId = this.id
                    createQuestion(this.question).then(result => {
                        if (result.code === '0000') {
                            this.getQuestions()
                            this.dialogVisible = false
                            this.$message.success("发布成功！")
                            this.$refs[question].resetFields()
                        }
                    }).finally(() =>
                        this.loading = false
                    )
                }
            })
        },
        openDialog() {
            if (this.auth) {
                this.dialogVisible = true
            } else {
                this.$router.push({name: 'Login'})
            }
        },
        handleOrderChange(orderBy) {
            this.orderBy = orderBy
            this.getQuestions()
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getQuestions()
        }
    }
}
</script>

<style>
.question {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}

.question:last-child {
    border-bottom: 0;
}

.question-info {
    width: 100%;
    margin-left: 10px;
}

.user-name {
    font-size: 14px;
    font-weight: bold;
}

.user-name a {
    color: #303133;
}

.create-time {
    font-size: 12px;
    margin-top: 4px;
}

.question-title {
    margin-top: 10px;
}

.question-title a {
    color: #303133;
}
</style>