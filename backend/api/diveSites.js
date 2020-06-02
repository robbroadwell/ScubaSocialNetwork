const express = require('express');
const router = express.Router()
const passport = require('passport');

const DiveSite = require('../models/diveSite');

router.get('/', (req, res) => {
  if (!req || !req.query || !req.query.polygon) {
    DiveSite.find({}, ['name', 'country', 'location', 'reviews'])
    .then(diveSites => res.json(diveSites))
    .catch(err => console.log(err))
    return
  }
  
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
  }, ['name', 'country', 'location', 'reviews'])
  .then(diveSites => res.json(diveSites))
  .catch(err => console.log(err))
})

router.get('/details/:id', (req, res) => {
  DiveSite.findById(req.params.id).then(diveSite => {
    res.json({
      diveSite
    })
  })
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
        newDiveSite
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

      console.log(req.body);

        DiveSite.findById(req.body.id).then(diveSite => {
          diveSite.details = {
            description: req.body.description,
            access: req.body.access,
            depth: req.body.depth,
            visibility: req.body.visibility,
            currents: req.body.currents,
            airTemperature: req.body.airTemperature,
            waterTemperature: req.body.waterTemperature,
            experienceLevel: req.body.experienceLevel,
          }
          console.log(diveSite)
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
