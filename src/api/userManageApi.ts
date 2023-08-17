import axios from './request'

export function getUserList(username = '') {
    return axios({
        url: '/api/userList',
        method: 'post',
        data: {
            username
        }
    }, '正在获取用户数据...')
}