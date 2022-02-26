<template>
    <el-card>
        <el-page-header @back="goBack" :content="question.title"/>
        <div class="flex-start user-info">
            <el-avatar :src="question.author.profilePicture">
                {{ question.author.fullName }}
            </el-avatar>
            <div class="question-info">
                <div class="user-name">
                    <router-link :to="{ name: 'User-Homepage', params: { username: question.author.username }}">
                        {{ question.author.fullName }}
                    </router-link>
                </div>
                <div class="create-time">
                    {{ question.createTime }}
                </div>
            </div>
        </div>
        <div class="question-content">
            {{ question.content }}
        </div>
    </el-card>
    <el-card class="answer-list">
        <ul>
            <li v-for="answer in answers" class="list">
                <div class="flex-start">
                    <el-avatar :src="answer.author.profilePicture">
                        {{ answer.author.fullName }}
                    </el-avatar>
                    <div class="answer-info">
                        <div class="user-name">
                            <router-link :to="{ name: 'User-Homepage', params: { username: answer.author.username }}">
                                {{ answer.author.fullName }}
                            </router-link>
                        </div>
                        <div class="create-time">
                            {{ answer.createTime }}
                        </div>
                        <div class="answer-content">
                            {{ answer.content }}
                        </div>
                    </div>
                </div>
            </li>
        </ul>
        <div v-if="this.auth" class="answer-form mt-2">
            <el-form ref="form">
                <el-form-item>
                    <el-input type="textarea" v-model.trim="content" :autosize="{minRows: 2, maxRows: 10}"
                              placeholder="请输入内容" minlength="5" maxlength="500" show-word-limit/>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" class="float-right" size="small" :loading="loading" @click="createAnswer">
                        提交
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :pager-count="5" :total="size" :page-size="10"
                           :hide-on-single-page="true" @current-change="handlePageChange">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
import {mapState} from 'vuex'
import {createAnswer, getAnswersOfQuestion, getQuestion} from '../utils/api'

export default {
    name: "Question-Content",
    data() {
        return {
            question: {author: {}},
            pageNum: null,
            answers: [],
            size: 0,
            content: null,
            loading: false
        }
    },
    computed: mapState([
        'auth'
    ]),
    created() {
        this.getQuestion()
        this.getAnswers()
    },
    methods: {
        getQuestion() {
            getQuestion(this.$route.params.id).then(result => {
                if (result.code === '0000') {
                    this.question = result.data
                }
            })
        },
        getAnswers() {
            getAnswersOfQuestion(this.$route.params.id, {pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.answers = result.data.list
                    this.size = result.data.size
                }
            })
        },
        createAnswer() {
            if (this.content === null || this.content.length < 5) {
                this.$alert('内容至少5个字', '提交失败')
            } else {
                this.loading = true
                createAnswer({questionId: this.question.id, content: this.content}).then(result => {
                    if (result.code === '0000') {
                        this.content = null
                        this.getAnswers()
                        this.$message.success("发布成功！")
                    }
                }).finally(() =>
                    this.loading = false
                )
            }
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getAnswers()
        },
        goBack() {
            this.$router.back()
        }
    }
}
</script>

<style>
.user-info {
    margin-top: 20px;
}

.question-content {
    line-height: 2;
    margin-top: 10px;
}

.answer-list {
    margin-top: 20px;
}

.answer-info {
    width: 100%;
    margin-left: 10px;
}

.answer-content {
    margin-top: 10px;
}

.answer-form {
    margin-top: 10px;
}
</style>