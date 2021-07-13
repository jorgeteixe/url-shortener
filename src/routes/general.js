const Resource = require('../models/Resource')

const redirect = async (req, res, next) => {
  const { id: shortCode } = req.params
  const r = await Resource.findOne({ shortCode })
  if (r) {
    res.redirect(r.url)
    r.count++
    r.save()
    return
  }
  next({ status: 404, message: 'The requested link doesn\'t exist' })
}

module.exports = {
  main: (req, res) => res.status(200).send('Welcome to the URL Shortener'),
  ping: (req, res) => res.status(200).send('pong'),
  redirect
}
