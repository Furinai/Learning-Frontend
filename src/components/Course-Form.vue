<template>
    <el-form :model="course" :rules="rules" ref="course" label-width="60px">
        <el-form-item prop="name" label="名称">
            <el-input type="text" v-model="course.name" maxlength="100" show-word-limit/>
        </el-form-item>
        <el-form-item prop="description" label="简介">
            <el-input type="textarea" v-model="course.description" :autosize="{minRows: 2}"
                      maxlength="500" show-word-limit/>
        </el-form-item>
        <el-form-item prop="price" label="价格">
            <el-input-number v-model="course.price" :precision="2" :step="0.1" :min="0"/>
        </el-form-item>
        <el-form-item prop="categories" label="分类">
            <el-select v-model="course.categories" value-key="id" multiple>
                <el-option-group v-for="parent in categories" :label="parent.name">
                    <el-option v-for="child in parent.children" :label="child.name" :value="child">
                    </el-option>
                </el-option-group>
            </el-select>
        </el-form-item>
        <el-form-item prop="coverPicture" label="封面">
            <el-upload class="cover-picture-uploader" action="" :show-file-list="false"
                       :http-request="uploadCoverPicture">
                <img v-if="course.coverPicture" :src="course.coverPicture" class="form-cover-picture" alt="封面">
                <i v-else class="el-icon-plus"></i>
            </el-upload>
        </el-form-item>
        <el-form-item class="text-right">
            <el-button size="small" @click="handleSubmit('course')" type="primary" :loading="loading">
                确认
            </el-button>
            <el-button size="small" @click="this.$router.back()">
                取消
            </el-button>
        </el-form-item>
    </el-form>
</template>

<script>
import {createCourse, getCategories, updateCourse, uploadCoverPicture} from '/@/utils/api'
import {buildTree} from '/@/utils/processing'

export default {
    name: "Course-Form",
    props: [
        'editMode',
        'course'
    ],
    data() {
        return {
            categories: [],
            loading: false,
            rules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                    {min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请输入简介', trigger: 'blur'},
                    {min: 2, max: 200, message: '长度在 2 到 200 个字符', trigger: 'blur'}
                ],
                price: [
                    {required: true, message: '请选择价格', trigger: 'change'}
                ],
                categories: [
                    {type: 'array', required: true, message: '请选择分类', trigger: 'change'}
                ],
                coverPicture: [
                    {required: true, message: '请上传封面', trigger: 'change'}
                ]
            }
        }
    },
    created() {
        this.getCategories()
    },
    methods: {
        getCategories() {
            getCategories().then(result => {
                if (result.code === '0000') {
                    this.categories = buildTree(result.data)
                }
            })
        },
        uploadCoverPicture(params) {
            let formData = new FormData()
            formData.append('multipartFile', params.file)
            uploadCoverPicture(formData).then(result => {
                if (result.code === '0000') {
                    this.$message.success('上传成功！')
                    this.course.coverPicture = result.data
                    this.$refs['course'].clearValidate('coverPicture')
                }
            })
        },
        handleSubmit(ref) {
            if (this.editMode === 'create') {
                this.createCourse(ref)
            } else if (this.editMode === 'update') {
                this.updateCourse(ref)
            }
        },
        createCourse(course) {
            this.$refs[course].validate((valid) => {
                if (valid) {
                    this.loading = true
                    createCourse(this.course).then(result => {
                        if (result.code === '0000') {
                            this.$message.success('创建成功！')
                        }
                    }).finally(() => this.loading = false)
                }
            })
        },
        updateCourse(course) {
            this.$refs[course].validate((valid) => {
                if (valid) {
                    this.loading = true
                    updateCourse(this.course).then(result => {
                        if (result.code === '0000') {
                            this.$message.success('更新成功！')
                        }
                    }).finally(() => this.loading = false)
                }
            })
        }
    }
}
</script>

<style>
.form-cover-picture {
    width: 350px;
    height: 200px;
    display: block;
}

.is-error .cover-picture-uploader > .el-upload {
    border: 1px dashed #F56C6C;
}

.cover-picture-uploader .el-upload {
    border: 1px dashed #D9D9D9;
    border-radius: 6px;
}

.cover-picture-uploader .el-icon-plus {
    font-size: 32px;
    color: #8c939d;
    width: 350px;
    line-height: 200px;
}
</style>