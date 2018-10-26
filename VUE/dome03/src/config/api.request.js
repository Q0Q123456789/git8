import HttpRequest from '@/config/axios'
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://127.0.0.1:10086' : 'https://api.xiaomu1314.xin'

const axios = new HttpRequest(baseUrl)
export default axios
