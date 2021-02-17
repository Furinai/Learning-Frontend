<template>
    <el-carousel ref="carousel" height="400px">
        <el-carousel-item v-for="course in courses" :key="course.id">
            <el-image :src="course.coverPhotoUrl" class="carousel-picture"/>
        </el-carousel-item>
    </el-carousel>
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
            <el-card :body-style="{ 'padding': '0px', 'min-height': '300px' }">
                <el-image :src="course.coverPhotoUrl" class="cover-photo"/>
                <div class="card-text">
                    <div class="course-name">
                        {{ course.name }}
                    </div>
                    <div class="course-price" v-if="course.price !== 0">
                        ￥{{ course.price }}
                    </div>
                    <div class="course-price free" v-else>
                        免费
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
</template>

<script>
import {getCategories, getCourses} from '/@/utils/api'

export default {
    name: 'Index',
    data() {
        return {
            categories: [],
            courses: []
        }
    },
    created() {
        this.getCategories()
        this.getCourses()
    },
    methods: {
        getCategories() {
            getCategories({pageSize: 0}).then(result => {
                if (result.code === '0000') {
                    let data = result.data.list
                    let map = new Map()
                    for (let category of data) {
                        category.children = []
                        map.set(category.id, category)
                    }
                    for (let [id, category] of map) {
                        if (category.parentId === 0) {
                            this.categories.push(category)
                        } else {
                            let parent = map.get(category.parentId)
                            parent.children.push(category)
                        }
                    }
                }
            })
        },
        getCourses(categoryId) {
            getCourses({pageSize: 8, categoryId, orderBy: 'heat'}).then(result => {
                if (result.code === '0000') {
                    this.courses = result.data.list
                    this.$refs['carousel'].setActiveItem(0)
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
.carousel-picture {
    height: 100%;
    width: 100%;
}

.category-list {
    margin-top: 30px;
    margin-bottom: 15px;
}

.course-card {
    margin-top: 20px;
}

.card-text {
    margin: 10px;
}

.cover-photo {
    height: 200px;
    width: 100%;
}

.course-price {
    font-size: 14px;
    color: #f56c6c;
    margin-top: 10px;
}

.course-price.free {
    color: #67C23A;
}
</style>