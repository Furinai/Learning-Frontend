<template>
    <div class="mt-1 mb-1">
        <el-button type="primary" size="mini" @click="openDialog" plain round>
            评价
        </el-button>
    </div>
    <ul>
        <li v-for="evaluation in evaluations" class="list">
            <div class="flex-start">
                <el-avatar :src="evaluation.author.profilePicture">
                    {{ evaluation.author.fullName }}
                </el-avatar>
                <div class="evaluation-info">
                    <div class="flex-between">
                        <div class="user-name">
                            <router-link :to="{ name: 'User-Homepage', params: { username: evaluation.author.username }}">
                                {{ evaluation.author.fullName }}
                            </router-link>
                        </div>
                        <el-rate v-model="evaluation.score" show-score disabled/>
                    </div>
                    <div class="create-time">
                        {{ evaluation.createTime }}
                    </div>
                    <div class="evaluation-comment">
                        {{ evaluation.comment }}
                    </div>
                </div>
            </div>
        </li>
    </ul>
    <div class="pagination">
        <el-pagination :hide-on-single-page="true" :pager-count="5" :total="size" background
                       layout="prev, pager, next" @current-change="handlePageChange">
        </el-pagination>
    </div>
    <el-dialog title="评价" v-model="dialogVisible" center>
        <el-form ref="evaluation" :model="evaluation" :rules="rules">
            <el-form-item>
                <el-rate v-model="evaluation.score"/>
            </el-form-item>
            <el-form-item prop="comment">
                <el-input type="textarea" v-model.trim="evaluation.comment" :autosize="{minRows: 4, maxRows: 10}"
                          placeholder="请输入内容" minlength="5" maxlength="500" show-word-limit/>
            </el-form-item>
            <el-form-item>
                <el-button class="button-long" type="primary" @click="createEvaluation('evaluation')" :loading="loading" round>
                    评价
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {mapState} from 'vuex'
import {createEvaluation, getEvaluationsOfCourse} from '../utils/api'

export default {
    name: "Course-Evaluation",
    data() {
        return {
            courseId: this.$route.params.id,
            evaluations: [],
            size: 0,
            pageNum: null,
            evaluation: {},
            dialogVisible: false,
            loading: false,
            rules: {
                comment: [
                    {required: true, message: '请输入内容', trigger: 'blur'},
                    {min: 2, max: 1000, message: '长度在2到1000个字符', trigger: 'blur'}
                ]
            }
        }
    },
    computed: mapState([
        'auth'
    ]),
    created() {
        this.getEvaluations()
    },
    methods: {
        getEvaluations() {
            getEvaluationsOfCourse(this.courseId, {pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.evaluations = result.data.list
                    this.size = result.data.size
                }
            })
        },
        createEvaluation(evaluation) {
            this.$refs[evaluation].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.evaluation.courseId = this.courseId
                    createEvaluation(this.evaluation).then(result => {
                        if (result.code === '0000') {
                            this.getEvaluations()
                            this.dialogVisible = false
                            this.$message.success("发布成功！")
                            this.$refs[evaluation].resetFields()
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
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getEvaluations()
        }
    }
}
</script>

<style>
.evaluation-info {
    width: 100%;
    margin-left: 10px;
}

.evaluation-comment {
    margin-top: 10px;
}
</style>