<template>
    <CourseForm action="update" ref="courseForm"/>
</template>

<script>
import {getCourse} from '/@/utils/api'
import CourseForm from '/@/components/Course-Form.vue'

export default {
    name: "Course-Update",
    components: {CourseForm},
    data() {
        return {
            courseId: this.$route.query.courseId
        }
    },
    created() {
        this.getCourse()
    },
    methods: {
        getCourse() {
            getCourse(this.courseId).then(result => {
                if (result.code === '0000') {
                    this.$refs['courseForm'].course = result.data
                }
            })
        }
    }
}
</script>

<style>
</style>