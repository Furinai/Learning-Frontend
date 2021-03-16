<template>
    <div class="flex-end">
        欢迎，{{ auth.fullName }}，
        <router-link :to="{name: 'Index'}">
            退出
        </router-link>
    </div>
</template>

<script>
import {mapState} from 'vuex'

export default {
    name: "Admin-Header",
    computed: mapState([
        'auth'
    ])
}
</script>

<style>
</style>