<template>
    <div v-if="editMode === 'update'">
        <CourseForm :course="course" editMode="update" @cancel="editMode = null" includeStatus="true"/>
    </div>
    <div v-else>
        <el-table ref="table" :data="courses" style="width: 100%" border>
            <el-table-column align="center" label="ID" prop="id" width="80"/>
            <el-table-column align="center" label="名称" prop="name"/>
            <el-table-column align="center" label="价格" prop="price" width="100"/>
            <el-table-column align="center" label="教师" prop="teacher.fullName" width="100"/>
            <el-table-column align="center" label="平均评分" prop="averageScore" width="100"/>
            <el-table-column align="center" label="审核通过" prop="approved" width="100"
                             :formatter="(row, column, cellValue) => { return cellValue ? '是' : '否' }"/>
            <el-table-column align="center" label="创建时间" prop="createTime" width="150"/>
            <el-table-column align="center" label="更新时间" prop="updateTime" width="150"/>
            <el-table-column align="center" label="操作" width="100">
                <template #default="scope">
                    <el-dropdown trigger="click" @command="handleCommand($event, scope.row)">
                        <span class="el-dropdown-link">
                            <i class="el-icon-s-operation"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="updateCourse">编辑课程</el-dropdown-item>
                                <el-dropdown-item command="deleteCourse">删除课程</el-dropdown-item>
                                <el-dropdown-item command="manageChapter">管理章节</el-dropdown-item>
                                <el-dropdown-item command="manageQuestion">管理问题</el-dropdown-item>
                                <el-dropdown-item command="manageEvaluation">管理评价</el-dropdown-item>
                                <el-dropdown-item command="manageNote">管理笔记</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
        <div class="pagination">
            <el-pagination :hide-on-single-page="true" :pager-count="5" :total="size" background
                           layout="prev, pager, next" @current-change="handlePageChange">
            </el-pagination>
        </div>
    </div>
</template>

<script>
import {deleteCourse, getCategoriesOfCourse, getCourse, getCourses} from '/@/utils/api'
import CourseForm from '/@/components/Course-Form.vue'

export default {
    name: "Course-Manage",
    components: {CourseForm},
    data() {
        return {
            course: {},
            courses: [],
            size: 0,
            editMode: null,
            pageNum: null
        }
    },
    created() {
        this.getCourses()
    },
    methods: {
        getCourse(courseId) {
            getCourse(courseId).then(result => {
                if (result.code === '0000') {
                    getCategoriesOfCourse(courseId).then(result => {
                        if (result.code === '0000') {
                            this.course = result.data
                            this.course.categories = result.data
                        }
                    })
                }
            })
        },
        getCourses() {
            getCourses({pageNum: this.pageNum, approved: false}).then(result => {
                if (result.code === '0000') {
                    this.courses = result.data.list
                    this.size = result.data.size
                }
            })
        },
        deleteCourse(row) {
            this.$confirm("确定删除？").then(() => {
                deleteCourse(row.id).then(result => {
                    if (result.code === '0000') {
                        let index = this.courses.indexOf(row)
                        this.courses.splice(index, 1)
                        this.$message.success("删除成功！")
                    }
                }).catch(() => {
                    this.$message.warning("已取消！")
                })
            })
        },
        handleCommand(command, row) {
            switch (command) {
                case 'updateCourse':
                    this.getCourse(row.id)
                    this.editMode = 'update'
                    break
                case 'deleteCourse':
                    this.deleteCourse(row)
                    break
                case 'manageChapter':
                    this.$router.push({name: 'Chapter-Manage', query: {courseId: row.id}})
                    break
                case 'manageQuestion':
                    this.$router.push({name: 'Question-Manage', query: {courseId: row.id}})
                    break
                case 'manageEvaluation':
                    this.$router.push({name: 'Evaluation-Manage', query: {courseId: row.id}})
                    break
                case 'manageNote':
                    this.$router.push({name: 'Note-Manage', query: {courseId: row.id}})
                    break
            }
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getCourses()
        }
    }
}
</script>

<style>
</style>