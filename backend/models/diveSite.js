const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const diveSiteSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    location: {
        type: Object,
        required: true
    },
    reviews: {
        type: Array,
        required: true
    },
    photos: {
        type: Array,
        required: true
    },
    details: {
        type: Object,
        required: false
    },
    rating: {
        type: Number,
        required: false
    },
})

module.exports = mongoose.model("DiveSite", diveSiteSchema, "diveSites")
