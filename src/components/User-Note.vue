<template>
    <ul v-if="notes && notes.length > 0">
        <li v-for="note in notes" class="note">
            <div class="note-info">
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
        </li>
    </ul>
    <el-empty v-else/>
    <div class="pagination">
        <el-pagination :hide-on-single-page="true" :pager-count="5" :total="size" background
                       layout="prev, pager, next" @current-change="handlePageChange">
        </el-pagination>
    </div>
</template>

<script>
import {getNotesOfUser} from '/@/utils/api'

export default {
    name: "User-Note",
    data() {
        return {
            notes: [],
            size: 0,
            pageNum: null
        }
    },
    created() {
        this.getNotes()
    },
    methods: {
        getNotes() {
            getNotesOfUser(this.$route.params.username, {pageNum: this.pageNum}).then(result => {
                if (result.code === '0000') {
                    this.notes = result.data.list
                    this.size = result.data.size
                }
            })
        },
        handlePageChange(pageNum) {
            this.pageNum = pageNum
            this.getNotes()
        }
    }
}
</script>

<style>
.note-create-time {
    font-size: 12px;
    margin-top: 12px;
}
</style>