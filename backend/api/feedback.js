const express = require('express');
const router = express.Router()
const Feedback = require('../models/feedback');

router.post('/', (req, res, next) => {
  const { email, feedback } = req.body;

  const newFeedback = new Feedback({
    email: email,
    feedback: feedback
  })

  newFeedback.save()
    .then(() => res.json({
      newFeedback
    }))
    .catch(err => res.status(400).json({
      "error": err,
      "message": "Error creating dive site"
  })) 

})

module.exports = router