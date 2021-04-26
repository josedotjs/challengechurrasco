const mongoose = require('mongoose')
let db
//Todo: Agregar cadena de conexión desde un config
const HOST =
  'mongodb://challenge:challenge@churrasco.uk.to:27017/challenge?authSource=admin'
db = mongoose
  .connect(HOST, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    console.log(`✓ Conexión establecida: ${HOST}`)
  })

mongoose.connection.on('error', () => {
  throw new Error(`No se pudo conectar a la base de datos: ${HOST}`)
  // process.exit()
})

const gracefulExit = () => {
  console.log(`Cerrando conexión de ${HOST} \n`)
  console.log(db)
  mongoose.connection.close()
  /*
  db.close().then(() => {
    console.log(`Desconectado de la base de datos`);
  });
  */
}

process.on('SIGINT', gracefulExit).on('SIGTERM', gracefulExit)

module.exports = mongoose
