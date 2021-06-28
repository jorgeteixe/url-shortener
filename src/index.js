const express = require('express')
const path = require('path')
const OpenApiValidator = require('express-openapi-validator')
const app = express()

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
    error: err.error,
    message: err.message
  })
})

app.listen(80)
