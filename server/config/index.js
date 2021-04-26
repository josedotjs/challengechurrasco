const Joi = require('joi')

require('dotenv').config()

const envVarsSchema = Joi.object({
  NODE_ENV: Joi.string()
    .allow('development', 'production', 'test')
    .default('development'),
  SERVER_PORT: Joi.number()
    .default(3000),
  JWT_SECRET: Joi.string().required()
    .description('JWT Secret required to sign'),
  MONGO_URI: Joi.string().required()
    .description('Mongo DB host uri'),
}).unknown()
  .required() 

  const { error, value: envVars } = envVarsSchema.validate(process.env)
  if (error) {
    throw new Error(`Error de validación de la configuración, chequee el archivo .env: ${error.message}`)
  }

  const config = {
    env: envVars.NODE_ENV,
    port: envVars.SERVER_PORT,
    jwtSecret: envVars.JWT_SECRET,
    mongoUri: envVars.MONGO_URI
  } 

  module.exports = config