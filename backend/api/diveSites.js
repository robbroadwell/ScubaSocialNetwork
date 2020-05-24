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
        } else {
            const { name, country, description, latitude, longitude, depth, visibility, access, rating } = req.body;
            const newDiveSite = new DiveSite({
                name: name, 
                country: country,
                location: {
                    type: "Point",
                    coordinates: [
                        latitude, longitude
                    ]
                },
                depth: depth,
                visibility: visibility,
                access: access,
                description: description,
                rating: rating
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


module.exports = router 