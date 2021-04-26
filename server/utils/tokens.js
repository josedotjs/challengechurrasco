const { sign, verify } = require('jsonwebtoken')
const { jwtSecret } = require('../config')
// const TOKEN_SECRET = 'abracadabra'

const createAccessToken = (user) => {
  console.log('secret', jwtSecret)
  // TODO: Validar datos
  return sign(
    {
      sub: user._id,
    },
    jwtSecret, // TODO: Sacar desde config
    { algorithm: 'HS256', expiresIn: '24h' }
  )
}

const verifyToken = (token) => {
  return verify(token, jwtSecret)
}

module.exports = {
  createAccessToken,
  verifyToken,
}
