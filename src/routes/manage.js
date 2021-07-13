const Resource = require('../models/Resource')
const generator = require('../generator')

const add = async (req, res, next) => {
  const { id: shortCode } = req.params
  const url = req.body
  const r = new Resource({
    url,
    shortCode
  })
  try {
    await r.save()
    return res.send({
      url: r.url,
      shortCode: r.shortCode,
      count: r.count
    })
  } catch (err) {
    if (err.errors && err.errors.url) {
      return next({ status: 400, message: 'Malformed URL' })
    }
    if (err.code === 11000) {
      return next({ status: 400, message: 'shortCode already in use' })
    }
    next({ status: 500 })
  }
}

const generate = async (req, res, next) => {
  const url = req.body
  const r = new Resource({
    url,
    shortCode: generator()
  })
  try {
    await r.save()
    return res.send({
      url: r.url,
      shortCode: r.shortCode,
      count: r.count
    })
  } catch (err) {
    console.log(err)
    if (err.errors && err.errors.url) {
      return next({ status: 400, message: 'Malformed URL' })
    }
    next({ status: 500 })
  }
}

module.exports = {
  add,
  generate
}
