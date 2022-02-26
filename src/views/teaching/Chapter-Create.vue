<template>
    <ChapterForm :chapter="chapter" editMode="create" separatePage="true"/>
</template>

<script>
import ChapterForm from '../../components/Chapter-Form.vue'

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