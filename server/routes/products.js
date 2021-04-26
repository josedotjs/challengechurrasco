const router = require('express').Router()
const productsController = require('../controllers/products')
const authMiddleware = require('../middlewares/auth')

router.get('/', authMiddleware, productsController.getAll)

router.post('/', authMiddleware, productsController.create)

router.post('/uploadphotos', authMiddleware, productsController.uploadPhotos)

module.exports = router
