<template>
    <el-container>
        <el-container>
            <el-affix>
                <el-header>
                    <Header/>
                </el-header>
            </el-affix>
            <el-main>
                <router-view/>
            </el-main>
            <el-footer>
                <Footer/>
            </el-footer>
        </el-container>
    </el-container>
</template>

<script>
import Header from '/@/components/Header.vue'
import Footer from '/@/components/Footer.vue'

export default {
    name: "Portal",
    components: {
        Header,
        Footer
    }
}
</script>