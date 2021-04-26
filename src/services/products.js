import api from './axios'

export const getAll = () => {
  return api.get('/products')
}

export const create = (data) => {
  return api.post('/products', data)
}

export const uploadPhotos = (data) => {
  return api.post('/products/uploadphotos', data)
}
