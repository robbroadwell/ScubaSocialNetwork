const express = require('express');
const router = express.Router()
const passport = require('passport');
const DiveSite = require('../models/diveSite');
var aws = require('aws-sdk'); 

aws.config.update({
  region: 'us-east-2', // Put your aws region here
  accessKeyId: "AKIAXVB2GWU3YOV6QGZM",
  secretAccessKey: "p2QU1ygNCH+vzEnmMGmnATX0Z1/SKWdcUiYpj/Km"
})

const S3_BUCKET = 'divingcollective-photos'

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
        const { name, country, latitude, longitude } = req.body;
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
          photos: []
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

router.put('/reviews/', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
    }
    
    console.log(req)

    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);

    } else if (!user) {
      console.error('user authorizing the JWT not found');
      res.status(403).send('user authorizing the JWT not found');

    } else if(!req.body.review || !req.body.id) {
      console.error('missing params');
      res.status(403).send('missing params');

    } else { 

      console.log(req.body);

        DiveSite.findById(req.body.id).then(diveSite => {
          diveSite.reviews.push(req.body.review)
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

router.put('/photo-upload/', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
    }
    
    console.log(req.body)

    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);

    } else if (!user) {
      console.error('user authorizing the JWT not found');
      res.status(403).send('user authorizing the JWT not found');

    } else if(!req.body.id || !req.body.fileName || !req.body.fileType) {
      console.error('missing params');
      res.status(403).send('missing params');

    } else { 

      const s3 = new aws.S3();

      const id = req.body.id
      const fileName = req.body.fileName;
      const key =  id + "/" + fileName;
      const fileType = req.body.fileType;

      const s3Params = {
        Bucket: S3_BUCKET,
        Key: key,
        Expires: 500,
        ContentType: fileType,
        ACL: 'public-read'
      };

      s3.getSignedUrl('putObject', s3Params, (err, data) => {
        console.log(data)
        if(err){
          console.log(err);
          res.json({success: false, error: err})
        }

        res.json({success:true, data:{
          signedRequest: data,
          url: `https://${S3_BUCKET}.s3.amazonaws.com/${key}`
        }});
      });

    }})(req, res, next);
})

router.put('/photos/', (req, res, next) => {
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) {
      console.error(err);
    }
    
    console.log(req.body)

    if (info !== undefined) {
      console.error(info.message);
      res.status(403).send(info.message);

    } else if (!user) {
      console.error('user authorizing the JWT not found');
      res.status(403).send('user authorizing the JWT not found');

    } else if(!req.body.id || !req.body.url || !req.body.author) {
      console.error('missing params');
      res.status(403).send('missing params');

    } else { 

      const {id, url, author} = req.body
      const photo = {
        url: url,
        author: author,
        timestamp: Date.now()
      }

      DiveSite.findById(id).then(diveSite => {
        console.log(diveSite)
        diveSite.photos.push(photo)
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
})

module.exports = router
