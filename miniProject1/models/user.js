const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/miniProject')

let userSchema = mongoose.Schema({
  email: String,
  name: String,
  username: String,
  password: String,
  followers: { type: Number, default: 0 },
  following: { type: Number, default: 0 },
  bio: {
    type: String,
    default: '',
  },
  posts: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'posts',
    }
  ],
  imgurl: {
    type: String,
    default: 'defaultPfp.jpg',
  },
})

module.exports = mongoose.model('users', userSchema)
