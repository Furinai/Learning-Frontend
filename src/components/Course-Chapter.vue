<template>
    <ul>
        <li v-for="(chapter, index) in chapters" class="chapter flex-between"
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

export default {
    name: "Course-Chapter",
    props: [
        'id'
    ],
    data() {
        return {
            chapters: [],
            chapter: {},
            dialogVisible: false
        }
    },
    created() {
        this.getChapters(this.id)
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
            this.chapter = chapter
            this.dialogVisible = true
        }
    }
}
</script>

<style>
.chapter {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}

.chapter:last-child {
    border-bottom: 0;
}

.text-content {
    line-height: 2;
    font-size: 16px;
    color: #303133;
}
</style>