const express = require('express');
const router = express.Router()

const DiveSite = require('../models/diveSite');

router.get('/', (req, res) => {
    DiveSite.find()
        .then(diveSites => res.json(diveSites))
        .catch(err => console.log(err))
})

router.post('/', (req, res) => {
    const { name, country, description, latitude, longitude, depth, visibility, access, rating } = req.body;
    const newDiveSite = new DiveSite({
        name: name, 
        country: country,
        latitude: latitude,
        longitude: longitude,
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
})

module.exports = router 