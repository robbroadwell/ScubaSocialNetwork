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
    code: {
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
    geometry: {
        type: Object,
        required: false
    },
    urlThumbnail: {
        type: String,
        required: false
    },
    regions: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("Destination", destinationSchema, "destination")
