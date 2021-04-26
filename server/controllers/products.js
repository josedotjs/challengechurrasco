const ProductModel = require('../models/products')
const path = require('path')
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(__dirname, '../public/images'))
  },
  filename: function(req, file, cb) {
    cb(
      null,
      `${+new Date()}_${Math.floor(Math.random() * 100000)}${path.extname(
        file.originalname
      )}`
    )
  },
})

const upload = multer({
  storage,
})

exports.getAll = async (req, res, next) => {
  try {
    const products = await ProductModel.find({}).lean()
    res.status(200).json(products)
  } catch (e) {
    next(e)
  }
}

exports.create = async (req, res, next) => {
  try {
    const data = req.body
    // Validaciones
    let errors = []

    if (!data.name || data.name.trim().length < 4) {
      errors.push('El nombre debe contener al menos 4 caracteres')
    }
    if (!data.SKU || data.SKU.trim() === '') {
      errors.push('El SKU es requerido')
    }
    if (isNaN(data.price) || data.price < 0) {
      errors.push('El precio debe ser un número mayor a cero')
    }
    if (isNaN(data.code) || data.code < 0) {
      errors.push('El código debe ser un número mayor a cero')
    }
    if (!data.currency || data.currency.trim() === '') {
      errors.push('Debe especificar una moneda')
    }
    if (!data.description || data.description.trim() === '') {
      errors.push('Debe agregar una descripción')
    }
    if (errors.length) {
      console.log(errors)
      return res.status(400).json({ errors })
    }
    // fin validaciones

    const product = new ProductModel(req.body)
    await product.save()
    res.sendStatus(200)
  } catch (e) {
    next(e)
  }
}

exports.uploadPhotos = [
  upload.array('files'),
  (req, res) => {
    const files = req.files.map(
      (file) =>
        `/${path
          .relative(path.join(__dirname, '../public'), file.path)
          .replace(/\\/g, '/')}`
    )
    res.status(200).json(files)
  },
]
