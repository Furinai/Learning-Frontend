<template>
    <el-tabs>
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
                    <el-image :src="course.coverPhotoUrl" class="card-cover-photo"/>
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
    <div class="pagination">
        <el-pagination background layout="prev, pager, next" :pager-count="5" :total="size" :page-size="20"
                       :hide-on-single-page="true" @current-change="handlePageChange">
        </el-pagination>
    </div>
</template>

<script>
import {getCategories, getCourses} from '/@/utils/api'

export default {
    name: "Course-List",
    data() {
        return {
            categories: [],
            courses: [],
            size: 0
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
                    for (let [, category] of map) {
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
            getCourses({pageSize: 20, categoryId, orderBy: 'heat'}).then(result => {
                if (result.code === '0000') {
                    this.courses = result.data.list
                    this.size = result.data.size
                }
            })
        },
        onChangeCategory(categoryId) {
            this.getCourses(categoryId)
        },
        handlePageChange(pageNum) {
            this.getCourses(pageNum)
        }
    }
}
</script>

<style>
.course-card {
    margin-top: 20px;
}

.card-text {
    margin: 10px;
}

.card-cover-photo {
    height: 200px;
    width: 100%;
}

.card-course-price {
    font-size: 14px;
    color: #f56c6c;
    margin-top: 10px;
}

.card-course-price.free {
    color: #67C23A;
}
</style>