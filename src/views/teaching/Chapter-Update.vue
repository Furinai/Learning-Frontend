<template>
    <ChapterForm action="update" ref="chapterForm"/>
</template>

<script>
import {getChapter} from '/@/utils/api'
import ChapterForm from '/@/components/Chapter-Form.vue'

export default {
    name: "Chapter-Update",
    components: {ChapterForm},
    data() {
        return {
            chapterId: this.$route.query.chapterId
        }
    },
    created() {
        this.getChapter()
    },
    methods: {
        getChapter() {
            getChapter(this.chapterId).then(result => {
                if (result.code === '0000') {
                    this.$refs['chapterForm'].chapter = result.data
                    this.$refs['chapterForm'].preview = result.data.videoUrl
                }
            })
        }
    }
}
</script>

<style>
</style>