<template>
    <el-menu active-text-color="#409EFF" background-color="#304156" text-color="#BFCBD9" router unique-opened>
        <el-scrollbar>
            <el-menu-item index="0" :route="{name: 'Index'}">
                <i class="el-icon-house"></i>
                <template #title>首页</template>
            </el-menu-item>
        </el-scrollbar>
    </el-menu>
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