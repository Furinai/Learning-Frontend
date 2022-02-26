<template>
    <UserForm :user="user" editMode="update" separatePage="true"/>
</template>
<script>
import {getUser} from '../utils/api'
import UserForm from '../components/User-Form.vue'

export default {
    name: "User-Setting",
    components: {UserForm},
    data() {
        return {
            username: this.$route.params.username,
            user: {},
        }
    },
    created() {
        this.getUser()
    },
    methods: {
        getUser() {
            getUser(this.username).then(result => {
                if (result.code === '0000') {
                    this.user = result.data
                    this.user.password = null
                }
            })
        }
    }
}
</script>

<style>
</style>