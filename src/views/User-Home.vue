<template>
    <div class="flex-start mb-2">
        <el-avatar :size="100" :src="user.profilePicture">
            {{ user.fullName }}
        </el-avatar>
        <div class="user-profile">
            <el-row>
                <el-col :span="8">
                    {{ user.fullName }}
                </el-col>
                <el-col :span="16">
                    <i class="el-icon-message"/>邮箱地址：{{ user.emailAddress }}
                </el-col>
            </el-row>
            <el-row class="mt-2">
                <el-col :span="8">
                    <i v-if="user.gender === '男'" class="el-icon-male"/>
                    <i v-if="user.gender === '女'" class="el-icon-female"/>
                </el-col>
                <el-col :span="16">
                    <i class="el-icon-mobile-phone"/>电话号码：{{ user.phoneNumber }}
                </el-col>
            </el-row>
        </div>
    </div>
    <el-tabs class="mt-2">
        <el-tab-pane label="课程">
            <UserCourse/>
        </el-tab-pane>
        <el-tab-pane label="笔记" lazy>
            <UserNote/>
        </el-tab-pane>
    </el-tabs>
</template>

<script>
import {getUser} from '/@/utils/api'
import UserCourse from '/@/components/User-Course.vue'
import UserNote from '/@/components/User-Note.vue'

export default {
    name: "User-Home",
    components: {
        UserNote,
        UserCourse
    },
    data() {
        return {
            user: {}
        }
    },
    created() {
        this.getUser()
    },
    methods: {
        getUser() {
            getUser(this.$route.params.username).then(result => {
                if (result.code === '0000') {
                    this.user = result.data
                }
            })
        }
    }
}
</script>

<style>
.el-icon-male {
    color: #1398FF;
}

.el-icon-female {
    color: #F37AAC;
}

.el-icon-message {
    color: #E6A23C;
}

.el-icon-mobile-phone {
    color: #409EFF;
}

.user-profile {
    margin: 20px 30px;
    width: 400px;
}
</style>