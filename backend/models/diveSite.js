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
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
})

module.exports = mongoose.model("DiveSite", diveSiteSchema, "diveSites")