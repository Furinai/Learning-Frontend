<template>
    <el-card>
        <el-row>
            <el-col :sm="12">
                <el-image :src="course.coverPicture" class="cover-picture"/>
            </el-col>
            <el-col :sm="12">
                <div class="course-info">
                    <div class="course-name">
                        {{ course.name }}
                    </div>
                    <div class="course-price" v-if="course.price !== 0">
                        ￥{{ course.price }}
                    </div>
                    <div class="course-price free" v-else>
                        免费
                    </div>
                    <div class="teacher-info">
                        <el-avatar :src="course.teacher.profilePicture" class="float-left">
                            {{ course.teacher.fullName }}
                        </el-avatar>
                        <span class="teacher-name user-name">
                             <router-link :to="{ name: 'User-Homepage', params: { username: course.teacher.username }}">
                                 {{ course.teacher.fullName }}
                             </router-link>
                        </span>
                    </div>
                    <div class="course-description">
                        简介：{{ course.description }}
                    </div>
                    <div class="average-score">
                        <i class="el-icon-medal"/>平均评分：
                        <span v-if="course.averageScore">
                            {{ course.averageScore }}分
                        </span>
                        <span v-else>
                            暂无评分
                        </span>
                    </div>
                    <div v-if="course.registered" class="register-button">
                        <el-button type="primary" size="small" round>
                            继续学习
                        </el-button>
                    </div>
                    <div v-else class="registered-button">
                        <el-button v-if="course.price !== 0" type="primary" size="small" round>
                            立即购买
                        </el-button>
                        <el-button v-else type="primary" size="small" round>
                            开始学习
                        </el-button>
                    </div>
                </div>
            </el-col>
        </el-row>
    </el-card>
    <el-card class="course-content">
        <el-tabs>
            <el-tab-pane label="章节">
                <CourseChapter/>
            </el-tab-pane>
            <el-tab-pane label="问答" lazy>
                <CourseQuestion/>
            </el-tab-pane>
            <el-tab-pane label="笔记" lazy>
                <CourseNote/>
            </el-tab-pane>
            <el-tab-pane label="评价" lazy>
                <CourseEvaluation/>
            </el-tab-pane>
        </el-tabs>
    </el-card>
</template>

<script>
import {getCourse} from '/@/utils/api'
import CourseChapter from '/@/components/Course-Chapter.vue'
import CourseQuestion from '/@/components/Course-Question.vue'
import CourseNote from '/@/components/Course-Note.vue'
import CourseEvaluation from '/@/components/Course-Evaluation.vue'

export default {
    name: "Course-Content",
    components: {
        CourseChapter,
        CourseQuestion,
        CourseNote,
        CourseEvaluation
    },
    data() {
        return {
            course: {teacher: {}}
        }
    },
    created() {
        this.getCourse(this.$route.params.id)
    },
    methods: {
        getCourse(id) {
            getCourse(id).then(result => {
                if (result.code === '0000') {
                    this.course = result.data
                }
            })
        }
    }
}
</script>

<style>
.cover-picture {
    height: 400px;
    width: 100%;
}

.course-info {
    margin-left: 40px;
}

.course-name {
    font-size: 20px;
}

.course-price {
    font-size: 20px;
    color: #f56c6c;
    margin-top: 20px;
}

.course-price.free {
    color: #67C23A;
}

.teacher-info {
    margin-top: 20px;
    line-height: 40px;
}

.teacher-name {
    margin-left: 10px;
}

.course-description {
    margin-top: 20px;
    line-height: 2;
}

.average-score {
    position: absolute;
    bottom: 30px;
    color: #67C23A;
}

.registered-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.course-content {
    margin-top: 20px;
}
</style>