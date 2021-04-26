import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: `/api`,
})

axiosInstance.interceptors.response.use(
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data
  },
  function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    return Promise.reject(error)
  }
)

const api = {
  get(url, config) {
    return axiosInstance.get(url, config)
  },
  post(url, data, config) {
    return axiosInstance.post(url, data, config)
  },
}

export default api
