const express = require('express')
const app = express()
const api = require('./routes/api')
const config = require('./config')
const mongoose = require('./libs/mongoose')

const PORT = config.port || 3000
mongoose.set('debug', config.env !== 'production')

app.use('/images', express.static(`${__dirname}/public/images`))
app.use('/api', api)

app.listen(PORT, () => console.log(`App running at localhost:${PORT}`))
