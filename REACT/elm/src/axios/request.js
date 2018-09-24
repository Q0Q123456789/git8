import HttpRequest from './axios'
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:8030' : 'https://api.xiaomu1314.xin'

const axios = new HttpRequest(baseUrl)
export default axios