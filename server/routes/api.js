const express = require('express')
const router = express.Router()
const auth = require('./auth')
const products = require('./products')

router.use(express.json())

router.get('/', (req, res) => res.sendStatus(200))
router.use('/auth', auth)
router.use('/products', products)

module.exports = router
