<template>
    <div class="flex-between mt-1 mb-1">
        <el-button type="primary" size="mini" @click="openDialog" plain round>
            新笔记
        </el-button>
        <el-switch v-model="onlyOwn" active-text="仅看自己的" @change="handleSwitchChange"/>
    </div>
    <ul>
        <li v-for="note in notes" class="note">
            <div class="flex-start">
                <el-avatar :src="note.author.profilePicture">
                    {{ note.author.fullName }}
                </el-avatar>
                <div class="note-info">
                    <div class="user-name">
                        {{ note.author.fullName }}
                    </div>
                    <div class="create-time">
                        {{ note.createTime }}
                    </div>
                    <div class="note-content" :class="{'overflow-hidden': !note.expanded}">
                        <pre>{{ note.content }}</pre>
                    </div>
                    <el-button v-if="!note.expanded" type="text" @click="note.expanded = true">
                        展开全文<i class="el-icon-arrow-down el-icon--right"></i>
                    </el-button>
                    <el-button v-else type="text" @click="note.expanded = false">
                        收起<i class="el-icon-arrow-up el-icon--right"></i>
                    </el-button>
                </div>
            </div>
        </li>
    </ul>
    <el-dialog title="新笔记" v-model="dialogVisible" center>
        <el-form ref="note" :model="note" :rules="rules">
            <el-form-item prop="content">
                <el-input type="textarea" v-model="note.content" rows="6" placeholder="内容"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button class="button-long" type="primary" @click="createNote('note')" :loading="loading" round>
                    发布
                </el-button>
            </el-form-item>
        </el-form>
    </el-dialog>
</template>

<script>
import {mapState} from 'vuex'
import {createNote, getNotesOfCourse} from '/@/utils/api'

export default {
    name: "Course-Note",
    props: [
        'id'
    ],
    data() {
        return {
            notes: [],
            size: 0,
            pageNum: null,
            onlyOwn: false,
            collapse: true,
            note: {},
            dialogVisible: false,
            loading: false,
            rules: {
                content: [
                    {required: true, message: '请输入内容', trigger: 'blur'},
                    {min: 2, max: 1000, message: '长度在2到1000个字符', trigger: 'blur'}
                ]
            }
        }
    },
    computed: mapState([
        "auth"
    ]),
    created() {
        this.getNotes()
    },
    methods: {
        getNotes() {
            getNotesOfCourse(this.id, {pageNum: this.pageNum, onlyOwn: this.onlyOwn}).then(result => {
                if (result.code === '0000') {
                    this.notes = result.data.list
                    this.size = result.data.size
                }
            })
        },
        createNote(note) {
            this.$refs[note].validate((valid) => {
                if (valid) {
                    this.loading = true
                    this.note.courseId = this.id
                    createNote(this.note).then(result => {
                        if (result.code === '0000') {
                            this.getNotes()
                            this.dialogVisible = false
                            this.$message.success("发布成功！")
                            this.$refs[note].resetFields()
                        }
                    }).finally(() =>
                        this.loading = false
                    )
                }
            })
        },
        openDialog() {
            if (this.auth) {
                this.dialogVisible = true
            } else {
                this.$router.push({name: 'Login'})
            }
        },
        handleSwitchChange(onlyOwn) {
            this.onlyOwn = onlyOwn
            this.getNotes()
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getQuestions()
        }
    }
}
</script>

<style>
.note {
    padding: 20px 0;
    border-bottom: 1px solid #eee;
}

.note:last-child {
    border-bottom: 0;
}

.note-info {
    width: 100%;
    margin-left: 10px;
}

.note-content pre {
    margin-top: 10px;
    line-height: 2;
    font-size: 16px;
}

.overflow-hidden {
    max-height: 100px;
    overflow: hidden;
}
</style>