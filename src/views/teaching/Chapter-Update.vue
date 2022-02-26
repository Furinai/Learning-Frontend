<template>
    <ChapterForm :chapter="chapter" editMode="update" separatePage="true"/>
</template>

<script>
import {getChapter} from '../../utils/api'
import ChapterForm from '../../components/Chapter-Form.vue'

export default {
    name: "Chapter-Update",
    components: {ChapterForm},
    data() {
        return {
            chapterId: this.$route.query.chapterId,
            chapter: {}
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
                }
            })
        }
    }
}
</script>

<style>
</style>