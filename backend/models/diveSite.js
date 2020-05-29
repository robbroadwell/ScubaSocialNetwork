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
    rating: {
        type: Number,
        required: false
    },
    reviews: {
        type: Array,
        required: false
    },
    details: {
        type: Object,
        required: false
    },
})

module.exports = mongoose.model("DiveSite", diveSiteSchema, "diveSites")
