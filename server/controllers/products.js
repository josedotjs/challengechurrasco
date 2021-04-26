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
    console.log('product', req.body)
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
    const files = req.files.map((file) =>
      path.relative(path.join(__dirname, '../public'), file.path)
    )
    res.status(200).json(files)
  },
]
