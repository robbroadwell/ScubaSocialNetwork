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
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    description: {
        type: String,
        required: false
    },
    depth: {
        type: String,
        required: false
    },
    visibility: {
        type: String,
        required: false
    },
    access: {
        type: String,
        required: false
    },
    rating: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("DiveSite", diveSiteSchema, "diveSites")