import axios from '@/config/api.request'
const ajax = {
    GET(url, params) {
        return axios.request({
            url: url,
            params,
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