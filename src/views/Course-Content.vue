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
                        <el-icon>
                            <medal/>
                        </el-icon>
                        平均评分：
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
                    <div v-else class="register-button">
                        <el-button v-if="course.price !== 0" @click="buyCourse" type="primary" size="small" round>
                            立即购买
                        </el-button>
                        <el-button v-else @click="registerCourse" type="primary" size="small" round>
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
                <CourseChapter ref="chapter-list" :registered="course.registered"/>
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
    <orderDetail ref="order-detail"/>
</template>

<script>
import {getCourse, updateRegistrationOfCourse} from '../utils/api'
import CourseChapter from '../components/Course-Chapter.vue'
import CourseQuestion from '../components/Course-Question.vue'
import CourseNote from '../components/Course-Note.vue'
import CourseEvaluation from '../components/Course-Evaluation.vue'
import OrderDetail from '../components/Order-Detail.vue'
import {mapState} from 'vuex'

export default {
    name: "Course-Content",
    components: {
        OrderDetail,
        CourseChapter,
        CourseQuestion,
        CourseNote,
        CourseEvaluation
    },
    data() {
        return {
            courseId: this.$route.params.id,
            course: {teacher: {}}
        }
    },
    computed: mapState([
        'auth'
    ]),
    created() {
        this.getCourse()
    },
    methods: {
        getCourse() {
            getCourse(this.courseId).then(result => {
                if (result.code === '0000') {
                    this.course = result.data
                }
            })
        },
        buyCourse() {
            if (!this.auth) {
                this.$router.push({name: 'Login'})
            } else {
                this.$refs['order-detail'].createOrder(this.courseId)
            }
        },
        registerCourse() {
            if (!this.auth) {
                this.$router.push({name: 'Login'})
            } else {
                updateRegistrationOfCourse({courseId: this.courseId}).then(result => {
                    if (result.code === '0000') {
                        this.updateContent()
                    }
                })
            }
        },
        updateContent() {
            this.getCourse()
            this.$refs['chapter-list'].getChapters()
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

.register-button {
    position: absolute;
    bottom: 10px;
    right: 10px;
}

.course-content {
    margin-top: 20px;
}
</style>