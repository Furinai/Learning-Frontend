<template>

</template>

<script>
export default {
    name: "Category-Manage",
    data() {
        return {
            categories: []
        }
    },
    created() {
        this.getCategories()
    },
    methods: {
        getCategories() {
            this.getCategories().then(result => {
                    if (result.code === '0000') {
                        this.categories = result.data
                    }
                }
            )
        }
    }
}
</script>

<style scoped>

</style>