const { verifyToken } = require('../utils/tokens')
const { jwtSecret } = require('../config')

module.exports = (req, res, next) => {
  const authorization = req.headers['authorization']
  if (!authorization) {
    // console.log('No se encontró el token de autenticación')
    return res.status(401).json('No se encontró el token de autenticación')
  }
  const token = authorization.split(' ')[1]
  console.log('token', token)
  try {
    const { sub } = verifyToken(token, jwtSecret)
    if (!sub) {
      return res.status(401).json('No se pudo obtener el dato que solicitado')
    }
    next()
  } catch (e) {
    // console.error(e)
    return res.status(401).json('Token no válido')
  }
}
