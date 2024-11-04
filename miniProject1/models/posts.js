const mongoose = require('mongoose')


let postSchema = mongoose.Schema({
    content: String,
    date: {
        type: Date,
        default: Date.now
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users'
    },
    posturl:String
})

module.exports = mongoose.model('posts', postSchema)
