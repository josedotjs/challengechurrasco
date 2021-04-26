import api from './axios'

const config = {
  headers: {
    Authorization: `Bearer ${localStorage.getItem('token')}`,
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded',
  },
}

export const getAll = () => {
  return api.get('/products', config)
}

export const create = (data) => {
  return api.post('/products', data, config)
}

export const uploadPhotos = (data) => {
  return api.post('/products/uploadphotos', data)
}
