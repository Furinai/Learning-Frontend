<template>
    <el-form :model="chapter" :rules="rules" ref="chapter" label-width="60px">
        <el-form-item prop="title" label="标题">
            <el-input type="text" v-model="chapter.title" maxlength="100" show-word-limit/>
        </el-form-item>
        <el-form-item prop="type" label="类型">
            <el-radio v-model="chapter.type" label="video" border>视频</el-radio>
            <el-radio v-model="chapter.type" label="text" border>文本</el-radio>
        </el-form-item>
        <el-form-item v-if="chapter.type === 'video'" prop="videoUrl" label="视频">
            <div class="flex-start">
                <div class="video-uploader">
                    <el-upload action="" :show-file-list="false" :http-request="uploadVideo">
                        <i class="el-icon-plus"/>
                    </el-upload>
                    <el-progress style="width: 210px" :stroke-width="16" :percentage="progress" text-inside/>
                </div>
                <video ref="video" v-if="preview" :src="preview" height="225" width="400"
                       controls controlslist="nodownload" disablePictureInPicture/>
            </div>
        </el-form-item>
        <el-form-item v-if="chapter.type === 'text'" prop="textContent" label="内容">
            <el-input type="textarea" v-model="chapter.textContent" :autosize="{minRows: 10}"
                      maxlength="500" show-word-limit/>
        </el-form-item>
        <el-form-item class="text-right">
            <el-button size="small" @click="onSubmit('chapter')" type="primary" :loading="loading">
                确认
            </el-button>
            <el-button v-if="editMode" size="small" @click="onCancel">
                取消
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {createChapter, updateChapter, uploadVideo} from '/@/utils/api'

export default {
    name: "Chapter-Form",
    props: [
        'editMode',
        'chapter',
        'preview',
        'separatePage'
    ],
    data() {
        return {
            loading: false,
            progress: 0,
            rules: {
                title: [
                    {required: true, message: '请输入标题', trigger: 'blur'},
                    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                ],
                type: [
                    {required: true, message: '请选择类型', trigger: 'change'}
                ],
                videoUrl: [
                    {required: true, message: '请上传视频', trigger: 'change'}
                ],
                textContent: [
                    {required: true, message: '请输入文本', trigger: 'blur'},
                    {min: 2, max: 200, message: '长度在 2 到 2000 个字符', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        uploadVideo(params) {
            this.loading = true
            let formData = new FormData()
            formData.append('multipartFile', params.file)
            uploadVideo(formData, progressEvent => {
                this.progress = (progressEvent.loaded / progressEvent.total * 100 | 0)
            }).then(result => {
                if (result.code === '0000') {
                    this.$message.success('上传成功！')
                    this.chapter.videoUrl = result.data
                    this.preview = URL.createObjectURL(params.file)
                    this.$refs['chapter'].clearValidate('videoUrl')
                }
            }).finally(() => this.loading = false)
        },
        onSubmit(ref) {
            if (this.editMode === 'create') {
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        if (this.chapter.type === 'video') {
                            if (!this.$refs['video']) {
                                return
                            } else {
                                this.chapter.videoTime = this.$refs['video'].duration * 1000
                            }
                        }
                        this.loading = true
                        this.chapter.courseId = this.$route.query.courseId
                        createChapter(this.chapter).then(result => {
                            if (result.code === '0000') {
                                this.$message.success('创建成功！')
                            }
                        }).finally(() => this.loading = false)
                    }
                })
            }
            if (this.editMode === 'update') {
                this.$refs[ref].validate((valid) => {
                    if (valid) {
                        this.loading = true
                        updateChapter(this.chapter).then(result => {
                            if (result.code === '0000') {
                                this.$message.success('更新成功！')
                            }
                        }).finally(() => this.loading = false)
                    }
                })
            }
        },
        onCancel() {
            if (this.separatePage) {
                this.$router.back()
            } else {
                this.$emit('cancel')
            }
        }
    }
}
</script>

<style>
.is-error .video-uploader  .el-upload {
    border: 1px dashed #F56C6C;
}

.video-uploader .el-upload {
    border: 1px dashed #D9D9D9;
    margin: 0 20px 10px 0;
    border-radius: 6px;
}

.video-uploader .el-icon-plus {
    font-size: 32px;
    color: #8c939d;
    width: 200px;
    line-height: 200px;
}
</style>