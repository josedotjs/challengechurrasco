const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ProductSchema = new Schema({
  SKU: {
    type: String,
    required: true,
  },
  code: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  pictures: [String],
  price: {
    type: Number,
    required: true,
  },
  currency: {
    type: String,
    required: true,
    default: 'USD',
  },
})

module.exports = mongoose.model('product', ProductSchema)
