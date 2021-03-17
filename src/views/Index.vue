<template>
    <el-carousel ref="carousel" type="card" height="400px">
        <el-carousel-item v-for="course in carousel">
            <router-link :to="{ name: 'Course-Content', params: { id: course.id }}">
                <el-image :src="course.coverPicture" class="carousel-picture"/>
            </router-link>
        </el-carousel-item>
    </el-carousel>
    <div class="text-center recommend-title">
        推荐课程
    </div>
    <el-tabs class="category-list">
        <el-tab-pane label="全部">
            <el-button size="small" @click="onChangeCategory()">
                全部
            </el-button>
        </el-tab-pane>
        <el-tab-pane v-for="category in categories" :label="category.name">
            <el-button size="small" v-for="child in category.children" @click="onChangeCategory(child.id)">
                {{ child.name }}
            </el-button>
        </el-tab-pane>
    </el-tabs>
    <el-row :gutter="20">
        <el-col v-for="course in courses" :xs="24" :sm="6" class="course-card">
            <router-link :to="{ name: 'Course-Content', params: { id: course.id }}">
                <el-card :body-style="{ 'padding': '0px', 'min-height': '300px' }">
                    <el-image :src="course.coverPicture" class="card-cover-picture"/>
                    <div class="card-text">
                        <div class="card-course-name">
                            {{ course.name }}
                        </div>
                        <div class="card-course-price" v-if="course.price !== 0">
                            ￥{{ course.price }}
                        </div>
                        <div class="card-course-price free" v-else>
                            免费
                        </div>
                    </div>
                </el-card>
            </router-link>
        </el-col>
    </el-row>
</template>

<script>
import {getCategories, getCourses} from '/@/utils/api'
import {buildTree} from '/@/utils/processing'

export default {
    name: 'Index',
    data() {
        return {
            value: 0,
            categories: [],
            courses: [],
            carousel: []
        }
    },
    created() {
        this.getCategories()
        this.getCourses()
    },
    methods: {
        getCategories() {
            getCategories().then(result => {
                this.categories = buildTree(result.data)
            })
        },
        getCourses(categoryId) {
            getCourses({pageSize: 8, categoryId, orderBy: 'average_score'}).then(result => {
                if (result.code === '0000') {
                    this.courses = result.data.list
                    if (this.carousel.length === 0) {
                        this.carousel = this.courses.slice(0, 5)
                        this.$refs['carousel'].setActiveItem(0)
                    }
                }
            })
        },
        onChangeCategory(categoryId) {
            this.getCourses(categoryId)
        }
    }
}
</script>

<style>
.category-list {
    margin-top: 30px;
    margin-bottom: 15px;
}

.carousel-picture {
    height: 100%;
    width: 100%;
}

.recommend-title {
    font-size: 20px;
    margin-top: 30px
}
</style>