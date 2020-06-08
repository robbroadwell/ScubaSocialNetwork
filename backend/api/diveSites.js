const express = require('express');
const router = express.Router()
const passport = require('passport');
const DiveSite = require('../models/diveSite');
const ChangeLog = require('../models/changeLog');
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
          photos: [],
          details: {
            description: [],
            depth: [],
            difficulty: [],
            visibility: []
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

      var changes = []

        DiveSite.findById(req.body.id).then(diveSite => {

          // description
          if (req.body.description && req.body.description !== '') {
            if (diveSite.details.description.length > 0) {
              var last = diveSite.details.description[diveSite.details.description.length - 1]
              if (req.body.description !== last.content) {
                changes.push({
                  section: "description",
                  change: diveSite.details.description[diveSite.details.description.length - 1] + " -> " + req.body.description
                })
                diveSite.details.description.push({
                  author: user.id,
                  content: req.body.description
                })
              }
            } else {
              changes.push({
                section: "description",
                change: " NEW " + req.body.description
              })
              diveSite.details.description.push({
                author: user.id,
                content: req.body.description
              })
            }
          }

          // depth
          if (req.body.depth && req.body.depth !== '') {
            if (diveSite.details.depth.length > 0) {
              var last = diveSite.details.depth[diveSite.details.depth.length - 1]
              if (req.body.depth !== last.content) {
                changes.push({
                  section: "depth",
                  change: diveSite.details.depth[diveSite.details.depth.length - 1] + " -> " + req.body.depth
                })
                diveSite.details.depth.push({
                  author: user.id,
                  content: req.body.depth
                })
              }
            } else {
              changes.push({
                section: "depth",
                change: " NEW " + req.body.depth
              })
              diveSite.details.depth.push({
                author: user.id,
                content: req.body.depth
              })
            }
          }

          // visibility
          if (req.body.visibility && req.body.visibility !== '') {
            if (diveSite.details.visibility.length > 0) {
              var last = diveSite.details.visibility[diveSite.details.visibility.length - 1]
              if (req.body.visibility !== last.content) {
                changes.push({
                  section: "visibility",
                  change: diveSite.details.visibility[diveSite.details.visibility.length - 1] + " -> " + req.body.visibility
                })
                diveSite.details.visibility.push({
                  author: user.id,
                  content: req.body.visibility
                })
              }
            } else {
              changes.push({
                section: "visibility",
                change: " NEW " + req.body.visibility
              })
              diveSite.details.visibility.push({
                author: user.id,
                content: req.body.visibility
              })
            }
          }

          // difficulty
          if (req.body.difficulty && req.body.difficulty !== '') {
            if (diveSite.details.difficulty.length > 0) {
              var last = diveSite.details.difficulty[diveSite.details.difficulty.length - 1]
              if (req.body.difficulty !== last.content) {
                changes.push({
                  section: "difficulty",
                  change: diveSite.details.difficulty[diveSite.details.difficulty.length - 1] + " -> " + req.body.difficulty
                })
                diveSite.details.difficulty.push({
                  author: user.id,
                  content: req.body.difficulty
                })
              }
            } else {
              changes.push({
                section: "difficulty",
                change: " NEW " + req.body.difficulty
              })
              diveSite.details.difficulty.push({
                author: user.id,
                content: req.body.difficulty
              })
            }
          }

          // access
          if (req.body.access && req.body.access !== '') {
            if (diveSite.details.access.length > 0) {
              var last = diveSite.details.access[diveSite.details.access.length - 1]
              if (req.body.access !== last.content) {
                changes.push({
                  section: "access",
                  change: diveSite.details.access[diveSite.details.access.length - 1] + " -> " + req.body.access
                })
                diveSite.details.access.push({
                  author: user.id,
                  content: req.body.access
                })
              }
            } else {
              changes.push({
                section: "access",
                change: " NEW " + req.body.access
              })
              diveSite.details.access.push({
                author: user.id,
                content: req.body.access
              })
            }
          }

          // currents
          if (req.body.currents && req.body.currents !== '') {
            if (diveSite.details.currents.length > 0) {
              var last = diveSite.details.currents[diveSite.details.currents.length - 1]
              if (req.body.currents !== last.content) {
                changes.push({
                  section: "access",
                  change: diveSite.details.currents[diveSite.details.currents.length - 1] + " -> " + req.body.currents
                })
                diveSite.details.currents.push({
                  author: user.id,
                  content: req.body.currents
                })
              }
            } else {
              changes.push({
                section: "currents",
                change: " NEW " + req.body.currents
              })
              diveSite.details.currents.push({
                author: user.id,
                content: req.body.currents
              })
            }
          }

          if (changes.length > 0) {
            const newChangeLog = new ChangeLog({
              user: user.id,
              diveSite: diveSite.id,
              changes: changes
            })
            newChangeLog.save()
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

      const {id, url} = req.body
      const photo = {
        url: url,
        author: user,
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
