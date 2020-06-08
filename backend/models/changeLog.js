const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const changeLogSchema = new Schema({
    user: {
        type: String,
        required: true
    },
    diveSite: {
        type: String,
        required: true
    },
    changes: {
        type: Array,
        required: true
    },
})

module.exports = mongoose.model("ChangeLog", changeLogSchema, "changeLog")
