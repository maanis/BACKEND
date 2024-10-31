const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/userSchema')

let userSchema = mongoose.Schema({
  username: String,
  email: String,
  imgurl: String
})

module.exports = mongoose.model('users', userSchema)
