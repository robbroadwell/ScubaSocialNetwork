const express = require('express');
const router = express.Router()
const passport = require('passport');
const DiveSite = require('../models/diveSite');
const Destination = require('../models/destination');
var aws = require('aws-sdk'); 

router.get('/', (req, res) => {
  if (!req || !req.query || !req.query.term) {

    res.status(401).send({
      'error': 'search term required'
    });

    return
  }

  const search = req.query.term

  DiveSite.aggregate([
    {
      $search: {
        "autocomplete": {
          "query": search,
          "path": "name",
          "fuzzy": {
            "maxEdits": 1,
            "prefixLength": 1,
            "maxExpansions": 256
          }
        }
      }
    }
  ])
  .then(diveSites => res.json(diveSites))
  .catch(err => console.log(err))
  
})

module.exports = router
