<template>
    <CourseForm :course="course" editMode="create" separatePage="true"/>
</template>

<script>

import CourseForm from '../../components/Course-Form.vue'

export default {
    name: "Course-Create",
    components: {CourseForm},
    data() {
        return {
            course: {categories: []}
        }
    }
}
</script>

<style>
</style>