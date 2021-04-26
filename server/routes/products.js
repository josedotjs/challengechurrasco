const router = require('express').Router()
const productsController = require('../controllers/products')

router
  .route('/')
  .get(productsController.getAll)
  .post(productsController.create)

router.post('/uploadphotos', productsController.uploadPhotos)

module.exports = router
