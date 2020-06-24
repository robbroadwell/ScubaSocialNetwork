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
    rating: {
        type: Number,
        required: true
    },
    ratingCount: {
        type: Number,
        required: true
    },
    urlThumbnail: {
        type: String,
        required: false
    },
    location: {
        type: Object,
        required: true
    },
    visibility: {
        type: String,
        required: false
    },
    depth: {
        type: String,
        required: false
    },
    waterTemp: {
        type: String,
        required: false
    },
    currents: {
        type: String,
        required: false
    },
    access: {
        type: String,
        required: false
    },
    destination: {
        type: Object,
        required: true
    },
    region: {
        type: Object,
        required: false
    }
})

module.exports = mongoose.model("DiveSite", diveSiteSchema, "diveSites")
