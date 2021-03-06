<template>
    <el-card>
        <el-page-header @back="goBack" :content="question.title"/>
        <div class="flex-start user-info">
            <el-avatar :src="question.author.profilePicture">
                {{ question.author.fullName }}
            </el-avatar>
            <div class="question-info">
                <div class="user-name">
                    {{ question.author.fullName }}
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
            <li v-for="answer in answers" class="answer">
                <div class="flex-start">
                    <el-avatar :src="answer.author.profilePicture">
                        {{ answer.author.fullName }}
                    </el-avatar>
                    <div class="answer-info">
                        <div class="user-name">
                            {{ answer.author.fullName }}
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
        <div class="pagination">
            <el-pagination background layout="prev, pager, next" :pager-count="5" :total="size" :page-size="20"
                           :hide-on-single-page="true" @current-change="handlePageChange">
            </el-pagination>
        </div>
    </el-card>
</template>

<script>
import {getAnswersOfQuestion, getQuestion} from '/@/utils/api'

export default {
    name: "Question-Content",
    data() {
        return {
            question: {author: {}},
            answers: [],
            size: 0
        }
    },
    created() {
        this.getQuestions()
        this.getAnswers()
    },
    methods: {
        getQuestions() {
            getQuestion(this.$route.params.id).then(result => {
                if (result.code === '0000') {
                    this.question = result.data
                }
            })
        },
        getAnswers() {
            getAnswersOfQuestion(this.$route.params.id).then(result => {
                if (result.code === '0000') {
                    this.answers = result.data.list
                    this.size = result.data.size
                }
            })
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getQuestions()
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

.answer {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}

.answer:last-child {
    border-bottom: 0;
}

.answer-info {
    width: 100%;
    margin-left: 10px;
}

.answer-content {
    margin-top: 10px;
}
</style>