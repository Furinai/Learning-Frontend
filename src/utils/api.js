import request from '/@/utils/request'

export function getAuthUser() {
    return request({
        url: '/oauth/user',
        method: 'get'
    })
}

export function registerUser(data) {
    return request({
        url: '/oauth/user',
        method: 'post',
        data
    })
}

export function getUsers(params) {
    return request({
        url: '/users',
        method: 'get',
        params
    })
}

export function getUser(pathVariable, params) {
    return request({
        url: '/users/' + pathVariable,
        method: 'get',
        params
    })
}

export function createUser(data) {
    return request({
        url: '/users',
        method: 'post',
        data
    })
}

export function updateUser(data) {
    return request({
        url: '/users',
        method: 'put',
        data
    })
}

export function deleteUser(pathVariable) {
    return request({
        url: '/users/' + pathVariable,
        method: 'delete'
    })
}

export function getCategories(params) {
    return request({
        url: '/categories',
        method: 'get',
        params
    })
}

export function getCourses(params) {
    return request({
        url: '/courses',
        method: 'get',
        params
    })
}

export function getCourse(pathVariable, params) {
    return request({
        url: '/courses/' + pathVariable,
        method: 'get',
        params
    })
}

export function createCourse(data) {
    return request({
        url: '/courses',
        method: 'post',
        data
    })
}

export function updateCourse(data) {
    return request({
        url: '/courses',
        method: 'put',
        data
    })
}

export function getChaptersOfCourse(pathVariable, params) {
    return request({
        url: '/courses/' + pathVariable + '/chapters',
        method: 'get',
        params
    })
}

export function getQuestionsOfCourse(pathVariable, params) {
    return request({
        url: '/courses/' + pathVariable + '/questions',
        method: 'get',
        params
    })
}

export function getNotesOfCourse(pathVariable, params) {
    return request({
        url: '/courses/' + pathVariable + '/notes',
        method: 'get',
        params
    })
}

export function getEvaluationsOfCourse(pathVariable, params) {
    return request({
        url: '/courses/' + pathVariable + '/evaluations',
        method: 'get',
        params
    })
}

export function getChapter(pathVariable, params) {
    return request({
        url: '/chapters/' + pathVariable,
        method: 'get',
        params
    })
}

export function createChapter(data) {
    return request({
        url: '/chapters',
        method: 'post',
        data
    })
}

export function updateChapter(data) {
    return request({
        url: '/chapters',
        method: 'put',
        data
    })
}

export function deleteChapter(pathVariable) {
    return request({
        url: '/chapters/' + pathVariable,
        method: 'delete'
    })
}

export function getQuestion(pathVariable, params) {
    return request({
        url: '/questions/' + pathVariable,
        method: 'get',
        params
    })
}

export function createQuestion(data) {
    return request({
        url: '/questions',
        method: 'post',
        data
    })
}

export function getAnswersOfQuestion(pathVariable, params) {
    return request({
        url: '/questions/' + pathVariable + '/answers',
        method: 'get',
        params
    })
}

export function createAnswer(data) {
    return request({
        url: '/answers',
        method: 'post',
        data
    })
}

export function createNote(data) {
    return request({
        url: '/notes',
        method: 'post',
        data
    })
}

export function createEvaluation(data) {
    return request({
        url: '/evaluations',
        method: 'post',
        data
    })
}

export function getCoursesOfUser(pathVariable, params) {
    return request({
        url: '/users/' + pathVariable + '/courses',
        method: 'get',
        params
    })
}

export function getNotesOfUser(pathVariable, params) {
    return request({
        url: '/users/' + pathVariable + '/notes',
        method: 'get',
        params
    })
}

export function uploadProfilePicture(data) {
    return request({
        url: '/profile-pictures',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

export function uploadCoverPicture(data) {
    return request({
        url: '/cover-pictures',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        data
    })
}

export function uploadVideo(data, onUploadProgress) {
    return request({
        url: '/videos',
        method: 'post',
        headers: {
            'Content-Type': 'multipart/form-data'
        },
        onUploadProgress,
        data
    })
}
