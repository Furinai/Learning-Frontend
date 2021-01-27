<template>
    <el-container>
        <el-container>
            <el-header>
                <Header/>
            </el-header>
            <el-main>
                <router-view/>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import Header from '/@/components/admin/Header.vue'

export default {
    name: "Portal",
    components: {
        Header
    }
}
</script>