import axios from './request'

const $http = {
    getList(access) {
        return axios.request({
            url: 'get_table_data',
            params: {
                access
            },
            method: 'get'
        })
    },
    post(access) {
        return axios.request({
            url: 'get_table_data',
            data: access,
            method: 'post'
        })
    }

}

export default $http