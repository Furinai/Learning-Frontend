<template>
    <div class="aside">
        <el-menu background-color="#304156" text-color="#BFCBD9" active-text-color="#409EFF"
                 unique-opened router>
            <el-scrollbar style="height: 100%;">
                <el-menu-item index="0" :route="{name: 'Index'}">
                    <i class="el-icon-house"></i>
                    <template #title>首页</template>
                </el-menu-item>
            </el-scrollbar>
        </el-menu>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "Aside",
    computed: mapState([
        "auth",
    ])
}
</script>

<style>
.aside {
    height: 100%;
}
</style>