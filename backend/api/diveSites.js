const express = require('express');
const router = express.Router()
const passport = require('passport');

const DiveSite = require('../models/diveSite');

router.get('/', (req, res) => {
  const polygon = req.query.polygon.split(',')

  DiveSite.find({
    location: {
      $geoWithin: {
        $geometry: {
          type: "Polygon",
          coordinates: [[
            [ parseFloat(polygon[0]), parseFloat(polygon[1]) ],
            [ parseFloat(polygon[2]), parseFloat(polygon[3]) ],
            [ parseFloat(polygon[4]), parseFloat(polygon[5]) ],
            [ parseFloat(polygon[6]), parseFloat(polygon[7]) ],
            [ parseFloat(polygon[8]), parseFloat(polygon[9]) ],
          ]]
        }
    }}
  })
  .then(diveSites => res.json(diveSites))
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
        const { name, country, latitude, longitude, description, depth, access, visibility, currents, airTemperature, waterTemperature, experienceLevel } = req.body;
        const newDiveSite = new DiveSite({
          name: name,
          country: country,
          location: {
            type: "Point",
            coordinates: [
                longitude, latitude
            ]
          },
          reviews: [],
          details: {
            description: description,
            depth: depth,
            access: access,
            visibility: visibility,
            currents: currents,
            airTemperature: airTemperature,
            waterTemperature: waterTemperature,
            experienceLevel: experienceLevel
          }
    })
    newDiveSite.save()
      .then(() => res.json({
        message: "Created dive site successfully"
      }))
      .catch(err => res.status(400).json({
        "error": err,
        "message": "Error creating dive site"
      }))
    }
  })(req, res, next);
});

router.put('/', (req, res, next) => {
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
        DiveSite.findById(req.body.id).then(diveSite => {
          diveSite.details = {
            description: req.body.description ? req.body.description : diveSite.details.description,
            access: req.body.access ? req.body.access : diveSite.details.access,
            depth: req.body.depth ? req.body.depth : diveSite.details.depth
          }
          diveSite.save().then(() => res.json({
              message: "Updated dive site successfully"
            }))
            .catch(err => res.status(400).json({
              "error": err,
              "message": "Error updating dive site"
            }))
          })
        }
      })(req, res, next);
});

module.exports = router
