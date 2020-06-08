const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
  email: {
    type: String,
    required: false
  },
  feedback: {
    type: String,
    required: true
  },
})

module.exports = mongoose.model("Feedback", feedbackSchema, "feedback")
