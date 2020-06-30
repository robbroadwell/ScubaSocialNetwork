const jwt = require('jsonwebtoken');
const passport = require('passport');
const express = require('express');
const router = express.Router()
const User = require('../models/user');
const jwtSecret = require('./jwtSecret');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {

    if (err) {
      console.error(`error ${err}`);
    }
    if (info !== undefined) {
      console.error(info.message);
      if (info.message === 'bad username') {
        res.status(401).send({

        });
      } else {
        res.status(403).send(info.message);
      }
    } else {
        const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
            expiresIn: 60 * 60,
          });
          res.status(200).send({
            auth: true,
            user: {
              username: user.username,
              firstName: user.firstName,
              lastName: user.lastName,
              email: user.email,
              token: token
            },
            message: 'user found & logged in',
          });
    }
  })(req, res, next);
});

router.post('/register', (req, res, next) => {
  User.findOne({ username: req.body.username }).then(user => {
    if (user !== null) {
      res.status(409).send({
        "error": "Username already in use."
      });
    } else {

      User.findOne({ email: req.body.email }).then(user => {
        if (user !== null) {
          res.status(409).send({
            "error": "Email already in use."
          });
        } else {
          
          bcrypt.hash(req.body.password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
            const newUser = new User({
            username: req.body.username,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
            photos: [],
            loggedDives: [],
            diveSitesAdded: [],
            comments: [],
            likes: []
          })
    
          newUser.save()
            .then(() => res.json({
                message: "Created account successfully"
            }))
            .catch(err => res.status(400).json({
                "error": err,
                "message": "Error creating account"
            }))
          })

        }
      })
    }
  })
})

module.exports = router
