<template>
    <ChapterForm editMode="update" :chapter="chapter" :preview="preview"/>
</template>

<script>
import {getChapter} from '/@/utils/api'
import ChapterForm from '/@/components/Chapter-Form.vue'

export default {
    name: "Chapter-Update",
    components: {ChapterForm},
    data() {
        return {
            chapterId: this.$route.query.chapterId,
            chapter: {},
            preview: null,
        }
    },
    created() {
        this.getChapter()
    },
    methods: {
        getChapter() {
            getChapter(this.chapterId).then(result => {
                if (result.code === '0000') {
                    this.chapter = result.data
                    this.preview = this.chapter.videoUrl
                }
            })
        }
    }
}
</script>

<style>
</style>