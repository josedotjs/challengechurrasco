import api from './axios'

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

export const login = (loginData) => {
  return api.post('/auth/login', loginData)
}

export const checkToken = () => {
  return api.post('/auth/isvalidtoken', {}, config)
}
