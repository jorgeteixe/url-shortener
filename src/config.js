require('dotenv').config()

const required = [
  'NODE_ENV',
  'MONGO_URI',
  'API_KEY'
]

required.forEach((name) => {
  if (!process.env[name]) {
    throw new Error(`Environment variable ${name} is missing`)
  }
})

const config = {
  env: process.env.NODE_ENV,
  apiKey: process.env.API_KEY,
  server: {
    port: Number(process.env.PORT) || 80
  },
  mongo: {
    uri: process.env.MONGO_URI
  }
}

module.exports = config
