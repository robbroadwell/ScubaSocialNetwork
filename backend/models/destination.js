const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const destinationSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    diveSiteCount: {
        type: Number,
        required: true
    },
    isTop: {
        type: Boolean,
        required: false
    },
    urlThumbnail: {
        type: String,
        required: true
    },
    regions: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("Destination", destinationSchema, "destination")
