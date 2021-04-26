const { sign, verify } = require('jsonwebtoken')

const TOKEN_SECRET = 'abracadabra'

const createAccessToken = (user) => {
  // TODO: Validar datos
  return sign(
    {
      sub: user._id,
    },
    TOKEN_SECRET, // TODO: Sacar desde config
    { algorithm: 'HS256', expiresIn: '24h' }
  )
}

const verifyToken = (token) => {
  return verify(token, TOKEN_SECRET)
}

module.exports = {
  createAccessToken,
  verifyToken,
}
