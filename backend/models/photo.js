const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const photoSchema = new Schema({
    timestamp: {
        type: Number,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    urlThumbnail: {
        type: String,
        required: true
    },
    countLikes: {
        type: Number,
        required: true
    },
    countViews: {
        type: Number,
        required: true
    },
    comments: {
        type: Array,
        required: true
    },
    diveSite: {
        type: Object,
        required: false
    },
    destination: {
        type: Object,
        required: false
    },
    region: {
        type: false,
        required: false
    },
    user: {
        type: Object,
        required: true
    },
})

module.exports = mongoose.model("ChangeLog", changeLogSchema, "changeLog")
