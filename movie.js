const mongoose = require('mongoose')

const movieSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    director: {
        type: String,
        required: true

    },

    type: {
        type: String,
        required: true

    },

    duration: {
        type: Number,
        reuired: true
    },
    
    year_of_creation: {
        type: Number,
        required: true,
    }

})

module.exports = mongoose.model('movie', movieSchema)
