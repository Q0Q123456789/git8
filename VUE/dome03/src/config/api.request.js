import HttpRequest from '@/config/axios'
const baseUrl = process.env.NODE_ENV === 'development' ? 'https://api.xiaomu1314.xin' : 'http://127.0.0.1:8030'

const axios = new HttpRequest(baseUrl)
export default axios
