const mongoose = require('mongoose')
const Schema = mongoose.Schema

const resourceSchema = new Schema({
  shortCode: {
    type: String,
    required: true,
    unique: true
  },
  url: {
    type: String,
    required: true,
    unique: true
  }
}, { timestamps: true })

resourceSchema.path('url').validate((val) => {
  const urlRegex = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)/
  return urlRegex.test(val)
}, 'Invalid URL')

module.exports = mongoose.model('Resource', resourceSchema)
