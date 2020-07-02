const express = require('express');
const router = express.Router()
const passport = require('passport');
const Destination = require('../models/destination');

router.get('/', (req, res) => {
  Destination.find().select('name code diveSiteCount isTop urlThumbnail')
    .then(destinations => res.json(destinations))
    .catch(err => console.log(err))
})

router.get('/top', (req, res) => {
  Destination.find({"isTop": true})
    .then(destinations => res.json(destinations))
    .catch(err => console.log(err))
})

router.get('/:id', (req, res) => {
  Destination.find({"_id": req.params.id})
    .then(destination => res.json(destination))
    .catch(err => console.log(err))
})

router.post('/', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
    }

    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);
    } else if (!user) {
      console.error('user authorizing the JWT not found');
      res.status(403).send('user authorizing the JWT not found');
    } else {

      var sem = require('semaphore')(1);
      const { destinations } = req.body;

      for (var i = 0; i < destinations.length; i++) {
        const item = destinations[i]

        const destination = new Destination({
          _id: item.name.replace(/\s+/g, '-').replace(/,/g, '-').toLowerCase(),
          name: item.name,
          code: item.code,
          diveSiteCount: 0,
          isTop: item.isTop,
          geometry: item.geometry,
          geojson: item.geojson,
          urlThumbnail: "https://divingcollective-photos.s3.us-east-2.amazonaws.com/destinations/" + item.name.replace(/\s+/g, '-').toLowerCase() + ".jpg",
          regions: []
        })
        sem.take(function() {
          destination.save()
          .then(sem.leave())
        })
      }

      sem.take(function() {
        res.json({
          'message': 'success'
        })
      })
    }
  })(req, res, next);
});

module.exports = router