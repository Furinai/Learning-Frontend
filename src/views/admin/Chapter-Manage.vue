<template>
    <div v-if="editMode === 'create' || editMode === 'update'">
        <ChapterForm :chapter="chapter" :editMode="editMode" :preview="preview" @cancel="handleCancel"/>
    </div>
    <div v-else>
        <el-table ref="table" :data="chapters" style="width: 100%" border>
            <el-table-column align="center" label="ID" prop="id" width="100"/>
            <el-table-column align="center" label="标题" prop="title"/>
            <el-table-column align="center" label="内容类型" prop="type"
                             width="150" :formatter="typeFormatter"/>
            <el-table-column align="center" label="创建时间" prop="createTime" width="200"/>
            <el-table-column align="center" label="修改时间" prop="updateTime" width="200"/>
            <el-table-column align="center" label="操作" width="150">
                <template #header>
                    <el-button size="mini" type="primary" @click="createChapter">新增</el-button>
                </template>
                <template #default="scope">
                    <el-dropdown trigger="click" @command="handleCommand($event, scope.row)">
                        <span class="el-dropdown-link">
                            <i class="el-icon-s-operation"></i>
                        </span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item command="previewContent">预览内容</el-dropdown-item>
                                <el-dropdown-item command="updateChapter">编辑章节</el-dropdown-item>
                                <el-dropdown-item command="deleteChapter">删除章节</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog :title="chapter.title" v-model="dialogVisible" width="760px" center destroy-on-close>
        <video v-if="chapter.type === 'video'" :src="chapter.videoUrl" height="405" width="720" controls/>
        <pre v-else class="text-content">
            {{ chapter.textContent }}
        </pre>
    </el-dialog>
</template>

<script>
import {deleteChapter, getChaptersOfCourse} from '/@/utils/api'
import ChapterForm from '/@/components/Chapter-Form.vue'

export default {
    name: "Chapter-Manage",
    components: {ChapterForm},
    data() {
        return {
            chapter: {},
            chapters: [],
            editMode: null,
            preview: null,
            dialogVisible: false
        }
    },
    created() {
        this.getChapters()
    },
    methods: {
        getChapters() {
            getChaptersOfCourse(this.$route.query.courseId).then(result => {
                if (result.code === '0000') {
                    this.chapters = result.data
                }
            })
        },
        createChapter() {
            this.chapter = {type: 'video'}
            this.editMode = 'create'
        },
        updateChapter(row) {
            this.chapter = row
            this.preview = row.videoUrl
            this.editMode = 'update'
        },
        deleteChapter(row) {
            this.$confirm("确定删除？").then(() => {
                deleteChapter(row.id).then(result => {
                    if (result.code === '0000') {
                        let index = this.chapters.indexOf(row)
                        this.chapters.splice(index, 1)
                        this.$message.success("删除成功！")
                    }
                }).catch(() => {
                    this.$message.warning("已取消！")
                })
            })
        },
        handleCommand(command, row) {
            switch (command) {
                case 'previewContent':
                    this.previewContent(row)
                    break
                case 'updateChapter':
                    this.updateChapter(row)
                    break
                case 'deleteChapter':
                    this.deleteChapter(row)
                    break
            }
        },
        typeFormatter(row, column, cellValue) {
            switch (cellValue) {
                case 'video':
                    return '视频'
                case 'text':
                    return '文本'
            }
        },
        previewContent(row) {
            this.chapter = row
            this.dialogVisible = true
        },
        handleCancel() {
            this.editMode = null
        }
    }
}
</script>

<style>
</style>