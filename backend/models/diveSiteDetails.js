const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diveSiteDetailsSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    urlThumbnail: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    visibility: {
        type: Array,
        required: true
    },
    depth: {
        type: Array,
        required: true
    },
    waterTemp: {
        type: Array,
        required: true
    },
    currents: {
        type: Array,
        required: true
    },
    access: {
        type: Array,
        required: true
    },
    destination: {
        type: Object,
        required: true
    },
    region: {
        type: Object,
        required: true
    },
    user: {
        type: Object,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    ratingCount: {
        type: Number,
        required: true
    },
    reviews: {
        type: Array,
        required: true
    },
    photos: {
        type: Array,
        required: true
    }
})

module.exports = mongoose.model("DiveSiteDetails", diveSiteDetailsSchema, "diveSiteDetails")
