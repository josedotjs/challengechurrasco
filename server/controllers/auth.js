const UserModel = require('../models/users')
const { createAccessToken } = require('../utils/tokens')
exports.login = async (req, res, next) => {
  console.info('login')
  const userParam = req.body.username.trim()
  try {
    const user = await UserModel.findOne({
      $or: [
        {
          email: userParam,
        },
        {
          username: userParam,
        },
      ],
    })
    if (!user) {
      return res.status(404).json('No se encontró el usuario')
    }
    if (!user.active) {
      return res.status(403).json('El usuario no se encuentra activo')
    }
    if (user.role !== 'admin') {
      return res
        .status(403)
        .json('El usuario no cuenta con los permisos suficientes')
    }

    const matchPasswords = user.comparePassword(req.body.password)
    if (!matchPasswords) {
      return res.status(401).json('Password incorrecto')
    }
    console.log(matchPasswords)

    // const { password, ...userData } = user // TODO: no permitir desde mongoose

    res.status(200).json({
      user: user.toJSON(),
      token: createAccessToken(user),
    })
  } catch (e) {
    next(e)
  }
}

exports.signup = async (req, res, next) => {
  try {
    const data = req.body
    const user = new UserModel(data)
    const savedUser = await user.save(data)
    res.status(200).json(savedUser)
  } catch (e) {
    next(e)
  }
}
