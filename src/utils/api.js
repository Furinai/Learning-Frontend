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

export function getChaptersOfCourse(pathVariable, params) {
    return request({
        url: '/courses/' + pathVariable + '/chapters',
        method: 'get',
        params
    })
}