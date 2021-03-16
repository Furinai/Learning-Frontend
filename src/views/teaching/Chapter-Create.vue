<template>
    <ChapterForm action="create" :chapter="chapter"/>
</template>

<script>
import ChapterForm from '/@/components/Chapter-Form.vue'

export default {
    name: "Chapter-Create",
    components: {ChapterForm},
    data() {
        return {
            chapter: {type: 'video'}
        }
    }
}
</script>

<style>
</style>