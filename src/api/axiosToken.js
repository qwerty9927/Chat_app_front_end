import axios from 'axios'
import Cookies from 'js-cookie'

const instance = axios.create({
  baseURL: "http://localhost:5000/",
  headers: {
    'Content-Type': 'application/json'
  }
})

const axiosToken = {
  get: async (path, option) => {
    return await instance.get(path, option)
  },
  post: async (path, option1, option2) => {
    return await instance.post(path, option1, option2)
  },
  del: async (path, option) => {
    return await instance.delete(path, option)
  }
}

instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  return new Promise((resolve, reject) => {
    const originalRequest = error.config
    if (error.response.status === 401 && !error.config.__isRetryRequest) {
      originalRequest._retry = true
      instance.get('auth/refreshToken', {
        withCredentials: true
      }).then((res) => {
        originalRequest.headers['Authorization'] = `Bearer ${Cookies.get("accessToken")}`
        resolve(instance.request(originalRequest))
      })
    } else {
      reject(error)
    }
  })
})

export default axiosToken
