const jwt = require('jsonwebtoken');
const passport = require('passport');
const express = require('express');
const router = express.Router()
const User = require('../models/user');
const jwtSecret = require('./jwtSecret');
const bcrypt = require('bcrypt');

const BCRYPT_SALT_ROUNDS = 12;

router.get('/', (req, res) => {
    User.find()
        .then(users => res.json(users))
        .catch(err => console.log(err))
})

router.post('/login', (req, res, next) => {
  passport.authenticate('login', (err, user, info) => {

    if (err) {
      console.error(`error ${err}`);
    }
    if (info !== undefined) {
      console.error(info.message);
      if (info.message === 'bad username') {
        res.status(401).send(info.message);
      } else {
        res.status(403).send(info.message);
      }
    } else {
        
        const token = jwt.sign({ id: user.id }, jwtSecret.secret, {
            expiresIn: 60 * 60,
          });
          res.status(200).send({
            auth: true,
            user: user,
            token,
            message: 'user found & logged in',
          });
    }
  })(req, res, next);
});

router.post('/register', (req, res, next) => {
    passport.authenticate('register', (err, user, info) => {
        const { username, password, email } = req.body;
        if (info !== undefined) {
            console.error(info.message);
            if (info.message === 'bad username') {
              res.status(401).send(info.message);
            } else {
              res.status(403).send(info.message);
            }
          } else {
            bcrypt.hash(password, BCRYPT_SALT_ROUNDS).then(hashedPassword => {
                const newUser = new User({
                username: username, 
                password: hashedPassword,
                email: email
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
    })(req, res, next);
})

module.exports = router 