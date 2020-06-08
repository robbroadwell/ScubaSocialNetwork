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
        description: {
            type: Array,
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
        difficulty: {
            type: Array,
            required: true
        },
        access: {
            type: Array,
            required: true
        },
        currents: {
            type: Array,
            required: true
        },
    },
    rating: {
        type: Number,
        required: false
    },
})

module.exports = mongoose.model("DiveSite", diveSiteSchema, "diveSites")
