const mongoose = require('mongoose')

const chatSchema = mongoose.Schema({
    mainImage: {
        type: String,
        require: true
    },
    ownerName: {
        type: String,
        required: true,
    },
    path: {
        type: String
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    likes: [{
        liker: {
            type: String,
            //require: true
        }
    }],
    comments: [{
        commenter: {
            type: String,
            //require: true
        },
        content: {
            type: String,
            //require: true
        },
        // 0 represents emoji, 1 represents image
        tag: {
            type: Number,
            default: 1
        }
    }],
}, {
    timestamps: true
})

const Chat = mongoose.model('Chat', chatSchema)

module.exports = Chat
