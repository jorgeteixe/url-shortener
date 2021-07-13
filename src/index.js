const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const logger = require('pino')()
const pino = require('pino-http')()
const OpenApiValidator = require('express-openapi-validator')
const errors = require('./errors')
const config = require('./config')

mongoose.connect(config.mongo.uri, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .catch(e => {
    logger.error('Coundn\'t connect to mongo:\n', e)
    process.exit(1)
  })

const app = express()

app.use(pino)
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: false }))

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, '../openapi.yml'),
    validateRequests: true,
    validateResponses: true,
    operationHandlers: path.join(__dirname),
    validateSecurity: {
      handlers: {
        ApiKeyAuth: (req, scopes, schema) => {
          if (config.apiKey !== req.header('x-api-key')) {
            // eslint-disable-next-line no-throw-literal
            throw { status: 401, message: 'Incorrect API-Key' }
          }
          return true
        }
      }
    }
  })
)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || errors[err.status]
  })
})

app.listen(config.server.port)
