const express = require('express');
const router = express.Router()
const passport = require('passport');
const DiveSite = require('../models/diveSite');
const Destination = require('../models/destination');
var aws = require('aws-sdk'); 
const destination = require('../models/destination');

router.get('/', (req, res) => {
  if (!req || !req.query || !req.query.term) {

    res.status(401).send({
      'error': 'search term required'
    });

    return
  }

  DiveSite.aggregate([
    {
      $search: {
        "autocomplete": {
          "query": req.query.term,
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
  .then(diveSites => {
    Destination.aggregate([
      {
        $search: {
          "autocomplete": {
            "query": req.query.term,
            "path": "name",
            "fuzzy": {
              "maxEdits": 1,
              "prefixLength": 1,
              "maxExpansions": 256
            }
          }
        }
      },
      {
        $limit: 3
      },
      {
        $project: {
          // "_id": 1,
          "name": 1,
          "diveSiteCount": 2,
          "urlThumbnail": 3
        }
      }
    ])
    .then(destinations => {
      res.json({
        destinations: destinations,
        diveSites: diveSites
      })
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})

module.exports = router
