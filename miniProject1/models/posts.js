const mongoose = require('mongoose')


let postSchema = mongoose.Schema({
    content: String
})

module.exports = mongoose.model('posts', postSchema)
