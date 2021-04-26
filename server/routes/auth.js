const router = require('express').Router()
const authController = require('../controllers/auth')
const authMiddleware = require('../middlewares/auth')

router.post('/login', authController.login)
router.post('/signup', authController.signup)
router.post('/isvalidtoken', authMiddleware, (req, res, next) => {
  res.sendStatus(200)
})
module.exports = router
