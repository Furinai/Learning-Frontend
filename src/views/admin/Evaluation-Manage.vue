<template>
    <el-table ref="table" :data="evaluations" style="width: 100%" border>
        <el-table-column align="center" label="ID" prop="id" width="150"/>
        <el-table-column align="center" type="expand" label="评论" width="150">
            <template #default="props">
                {{ props.row.comment }}
            </template>
        </el-table-column>
        <el-table-column align="center" label="评分" prop="score">
            <template #default="scope">
                <el-rate v-model="scope.row.score" show-score disabled/>
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
                            <el-dropdown-item command="updateEvaluation">编辑评价</el-dropdown-item>
                            <el-dropdown-item command="deleteEvaluation">删除评价</el-dropdown-item>
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
    <el-dialog title="编辑评价" v-model="dialogVisible" center>
        <el-form ref="evaluation" :model="evaluation" :rules="rules">
            <el-form-item>
                <el-rate v-model="evaluation.score"/>
            </el-form-item>
            <el-form-item prop="comment">
                <el-input type="textarea" v-model.trim="evaluation.comment" :autosize="{minRows: 4, maxRows: 10}"
                          placeholder="请输入内容" minlength="5" maxlength="500" show-word-limit/>
            </el-form-item>
            <el-form-item>
                <el-button class="button-long" type="primary" :loading="loading"
                           @click="updateEvaluation('evaluation')" round>
                    确定
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {deleteEvaluation, getEvaluationsOfCourse, updateEvaluation} from '../../utils/api'

export default {
    name: "Evaluation-Manage",
    data() {
        return {
            evaluation: {},
            evaluations: [],
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
        this.getEvaluations()
    },
    methods: {
        getEvaluations() {
            getEvaluationsOfCourse(this.$route.query.courseId, {pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.evaluations = result.data.list
                    this.size = result.data.size
                }
            })
        },
        updateEvaluation(evaluation) {
            this.$refs[evaluation].validate((valid) => {
                if (valid) {
                    this.loading = true
                    updateEvaluation(this.evaluation).then(result => {
                        if (result.code === '0000') {
                            this.$message.success('更新成功！')
                        }
                    }).finally(() => this.loading = false)
                }
            })
        },
        deleteEvaluation(row) {
            this.$confirm("确定删除？").then(() => {
                deleteEvaluation(row.id).then(result => {
                    if (result.code === '0000') {
                        let index = this.evaluations.indexOf(row)
                        this.evaluations.splice(index, 1)
                        this.$message.success("删除成功！")
                    }
                }).catch(() => {
                    this.$message.warning("已取消！")
                })
            })
        },
        handleCommand(command, row) {
            switch (command) {
                case 'updateEvaluation':
                    this.evaluation = row
                    this.editMode = 'update'
                    this.dialogVisible = true
                    break
                case 'deleteEvaluation':
                    this.deleteEvaluation(row)
                    break
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
</style>