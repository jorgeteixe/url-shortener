const mongoose = require('mongoose')
const express = require('express')
const path = require('path')
const morgan = require('morgan')
const OpenApiValidator = require('express-openapi-validator')
const errors = require('./errors')

require('dotenv').config()

mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
  .catch(e => {
    console.error('Coundn\'t connect to mongo:\n', e)
    process.exit(1)
  })

const app = express()

app.use(morgan('short'))
app.use(express.json())
app.use(express.text())
app.use(express.urlencoded({ extended: false }))

app.use(
  OpenApiValidator.middleware({
    apiSpec: path.join(__dirname, '../openapi.yml'),
    validateRequests: true,
    validateResponses: true,
    operationHandlers: path.join(__dirname)
  })
)

app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    message: err.message || errors[err.status]
  })
})

app.listen(80)
