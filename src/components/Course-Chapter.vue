<template>
    <ul>
        <li v-for="(chapter, index) in chapters" class="list flex-between"
            @click="viewChapter(chapter)">
            <span class="chapter-icon">
                <i v-if="chapter.type ==='video'" class="el-icon-video-play"/>
                <i v-if="chapter.type ==='text'" class="el-icon-document"/>
                第{{ index + 1 }}章：{{ chapter.title }}
            </span>
            <span v-if="chapter.videoTime">
                <i class="el-icon-time"/>{{ chapter.videoTime }}
            </span>
        </li>
    </ul>
    <el-dialog :title="chapter.title" v-model="dialogVisible" width="760px" center destroy-on-close>
        <video v-if="chapter.videoUrl" :src="chapter.videoUrl" height="405" width="720"
               controls controlslist="nodownload" disablePictureInPicture/>
        <pre v-else class="text-content">
            {{ chapter.textContent }}
        </pre>
    </el-dialog>
</template>

<script>
import {getChaptersOfCourse} from '/@/utils/api'
import {mapState} from 'vuex'

export default {
    name: "Course-Chapter",
    props: [
        'registered'
    ],
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
        this.getChapters()
    },
    methods: {
        getChapters() {
            getChaptersOfCourse(this.courseId).then(result => {
                if (result.code === '0000') {
                    this.chapters = result.data
                }
            })
        },
        viewChapter(chapter) {
            if (!this.auth) {
                this.$router.push({name: 'Login'})
            } else {
                if (this.registered) {
                    this.chapter = chapter
                    this.dialogVisible = true
                }else {
                    this.$message.warning("请先参加或购买课程")
                }
            }
        }
    }
}
</script>

<style>
.chapter-icon i {
    font-size: 20px;
}

.text-content {
    line-height: 2;
    font-size: 16px;
    color: #303133;
}
</style>