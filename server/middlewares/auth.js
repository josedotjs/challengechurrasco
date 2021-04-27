const { verifyToken } = require('../utils/tokens')
const { jwtSecret } = require('../config')
const UserModel = require('../models/users')

module.exports = async (req, res, next) => {
  console.log('auth middleware')
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
    const user = await UserModel.findOne({ _id: sub }).lean()

    if (!user.active) {
      return res.status(401).json('El usuario no se encuentra activo')
    }

    next()
  } catch (e) {
    // console.error(e)
    return res.status(401).json('Token no válido')
  }
}
