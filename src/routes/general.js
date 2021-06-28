const Resource = require('../models/Resource')

const redirect = async (req, res, next) => {
  const { id: shortCode } = req.params
  const r = await Resource.findOne({ shortCode })
  if (r) {
    res.redirect(r.url)
  } else {
    return next({ status: 404, message: 'The requested link doesn\'t exist' })
  }
}

module.exports = {
  ping: (req, res) => res.status(200).send('pong'),
  redirect
}
