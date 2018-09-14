import axios from '@/config/api.request'

export const login = ({ username, password }) => {
  const data = {
    username,
    password
  }
  return axios.request({
    url: '/performance/model/login',
    data,
    method: 'post'
  })
}

export const getUserInfo = (token) => {
  return axios.request({
    url: 'get_info',
    params: {
      token
    },
    method: 'get'
  })
}

export const logout = (token) => {
  return axios.request({
    url: 'logout',
    method: 'post'
  })
}
