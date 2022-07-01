import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000/',
  headers: {
    'Content-Type' : 'application/json'
  }
})

const get = async (path, option = {}) => {
  return await instance.get(path, option)
}

const post = async (path, option1, option2 = {}) => {
  return await instance.post(path, option1, option2)
}

const del = async (path, option) => {
  await instance.delete(path, option)
}

instance.interceptors.response.use((response) => {
  return response
}, (error) => {
  console.log("error")
  return Promise.reject(error)
})

export { get, post, del }

export default instance