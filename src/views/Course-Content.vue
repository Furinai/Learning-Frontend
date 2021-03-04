<template>
    <el-card>
        <el-row>
            <el-col :sm="12">
                <el-image :src="course.coverPhotoUrl" class="cover-photo"/>
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
                        <span class="teacher-name">{{ course.teacher.fullName }}</span>
                    </div>
                    <div class="course-description">
                        简介：{{ course.description }}
                    </div>
                    <div class="collect-button">
                        <i class="el-icon-star-off">
                            收藏
                        </i>
                    </div>
                    <div class="join-button">
                        <el-button v-if="course.price !== 0" type="primary" size="small" round>
                            立即购买
                        </el-button>
                        <el-button v-else type="primary" round>
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
                <CourseChapter :id="this.$route.params.id"/>
            </el-tab-pane>
            <el-tab-pane label="问答" lazy>
                <CourseQuestion :id="this.$route.params.id"/>
            </el-tab-pane>
            <el-tab-pane label="笔记" lazy>
                <CourseNote :id="this.$route.params.id"/>
            </el-tab-pane>
            <el-tab-pane label="评价" lazy>
                <CourseEvaluation :id="this.$route.params.id"/>
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
    data() {
        return {
            course: {teacher: {}}
        }
    },
    components: {
        CourseChapter,
        CourseQuestion,
        CourseNote,
        CourseEvaluation
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
.cover-photo {
    height: 400px;
    width: 100%;
}

.course-info {
    margin-left: 40px;
}

.course-name {
    font-size: 24px;
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

.collect-button {
    position: absolute;
    bottom: 20px;
}

.join-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.course-content {
    margin-top: 20px;
}
</style>