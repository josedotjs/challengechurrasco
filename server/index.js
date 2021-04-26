const express = require('express')
const app = express()
const api = require('./routes/api')
const mongoose = require('./libs/mongoose')

const PORT = process.env.PORT || 3000
mongoose.set('debug', process.env.NODE_ENV !== 'production')

app.use('/api', api)

app.listen(PORT, () => console.log(`App running at localhost${PORT}`))
