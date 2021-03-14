<template>
    <ul>
        <li v-for="(chapter, index) in chapters" class="list flex-between"
            @click="viewChapter(chapter)">
            第{{ index + 1 }}章：{{ chapter.title }}
            <span v-if="chapter.videoTime">
                <i class="el-icon-time"/>{{ chapter.videoTime }}
            </span>
        </li>
    </ul>
    <el-dialog :title="chapter.title" v-model="dialogVisible" width="760px" center destroy-on-close>
        <video v-if="chapter.videoUrl" :src="chapter.videoUrl" height="405" width="720"
               controls controlslist="nodownload" disablePictureInPicture/>
        <pre v-if="chapter.textContent" class="text-content">
            {{ chapter.textContent }}
        </pre>
    </el-dialog>
</template>

<script>
import {getChaptersOfCourse} from '/@/utils/api'
import {mapState} from 'vuex'

export default {
    name: "Course-Chapter",
    data() {
        return {
            courseId: this.$route.params.id,
            chapters: [],
            chapter: {},
            dialogVisible: false
        }
    },
    computed: mapState([
        'auth'
    ]),
    created() {
        this.getChapters(this.courseId)
    },
    methods: {
        getChapters(id) {
            getChaptersOfCourse(id).then(result => {
                if (result.code === '0000') {
                    this.chapters = result.data
                }
            })
        },
        viewChapter(chapter) {
            //todo 权限验证
            if (!this.auth) {
                this.$router.push({name: 'Login'})
            } else {
                this.chapter = chapter
                this.dialogVisible = true
            }
        }
    }
}
</script>

<style>
.text-content {
    line-height: 2;
    font-size: 16px;
    color: #303133;
}
</style>