const mongoose = require('mongoose')
const modelOptions = require('./models.options').modelOptions

const reviewSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    content:{
        type: String,
        required: true
    },

    mediaType: {
        type: String,
        enum: ['tv', 'movie'],
        required: true
    },

    mediaId:{
        type: String,
        required: true,
    },

    mediaTitle: {
        type: String,
        required: true,
    },

    mediaPoster: {
        type: String,
        required: true,
    }
}, modelOptions)

const ReviewModel = mongoose.model('Review', reviewSchema)
module.exports = {ReviewModel}