import axios from '@/config/api.request'
const ajax = {
    GET(url, access) {
        return axios.request({
            url: url,
            params: {
                access
            },
            method: 'get'
        })
    },
    POST(url, data) {

        return axios.request({
            url: url,
            data,
            method: 'post'
        })
    }
}

export default ajax;