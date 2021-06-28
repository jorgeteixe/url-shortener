const redirect = (req, res) => {
  res.send('hello')
}

module.exports = {
  ping: (req, res) => res.status(200).send('pong'),
  redirect: (req, res) => res.status(200).send('redirect')
}
