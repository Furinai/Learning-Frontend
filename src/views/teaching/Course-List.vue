<template>
    <el-button type="primary" size="mini" @click="createCourse" plain round>
        新建课程
    </el-button>
    <ul>
        <li v-for="course in courses" class="list">
            <el-row :gutter="20">
                <el-col :span="4">
                    <el-image :src="course.coverPicture"/>
                </el-col>
                <el-col :span="18">
                    <div class="course-name">
                        {{ course.name }}
                    </div>
                    <div class="course-price" v-if="course.price !== 0">
                        ￥{{ course.price }}
                    </div>
                    <div class="course-price free" v-else>
                        免费
                    </div>
                    <div class="mt-2">
                        <i class="el-icon-medal"/>平均评分：
                        <span v-if="course.averageScore">
                            {{ course.averageScore }}分
                        </span>
                        <span v-else>
                            暂无评分
                        </span>
                    </div>
                    <div v-if="course.approved" class="checked mt-2">
                        <i class="el-icon-circle-check"></i>已通过审核
                    </div>
                    <div v-else class="unchecked mt-2">
                        <i class="el-icon-circle-close"></i>未通过审核
                    </div>
                </el-col>
                <el-col :offset="1" :span="1">
                    <el-dropdown @command="handleCommand($event, course)" trigger="click">
                        <span class="el-dropdown-link">
                            <i class="el-icon-s-operation"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="updateCourse">编辑课程</el-dropdown-item>
                                <el-dropdown-item command="manageChapter">管理章节</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </el-col>
            </el-row>
        </li>
    </ul>
    <div class="pagination">
        <el-pagination :hide-on-single-page="true" :pager-count="5" :total="size" background
                       layout="prev, pager, next" @current-change="handlePageChange">
        </el-pagination>
    </div>
</template>

<script>
import {mapState} from 'vuex'
import {getCourses} from '/@/utils/api'

export default {
    name: "Teaching-Home",
    computed: mapState([
        'auth'
    ]),
    data() {
        return {
            courses: [],
            size: 0,
            pageNum: null,
        }
    },
    created() {
        this.getCourse()
    },
    methods: {
        getCourse() {
            getCourses({teacherName: this.auth.username, pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.courses = result.data.list
                    this.size = result.data.size
                }
            })
        },
        createCourse() {
            this.$router.push({name: 'Teaching-Course-Create'})
        },
        updateCourse(course) {
            this.$router.push({name: 'Teaching-Course-Update', query: {courseId: course.id}})
        },
        manageChapter(course) {
            this.$router.push({name: 'Teaching-Chapter-List', query: {courseId: course.id}})
        },
        handleCommand(command, course) {
            switch (command) {
                case 'updateCourse':
                    this.updateCourse(course)
                    break
                case 'manageChapter':
                    this.manageChapter(course)
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
.checked {
    color: #67C23A;
}

.unchecked {
    color: #f56c6c;
}
</style>