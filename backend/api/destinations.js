const express = require('express');
const router = express.Router()
const passport = require('passport');
const Destination = require('../models/destination');

router.get('/', (req, res) => {
  Destination.find()
    .then(destinations => res.json(destinations))
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
          _id: item.id,
          name: item.name,
          diveSiteCount: 0,
          isTop: item.isTop,
          urlThumbnail: item.urlThumbnail,
          regions: item.regions
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