const jwt = require('jsonwebtoken');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
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

passport.use(
    'login',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      (username, password, done) => {
        try {
            User.findOne({ username: username }, function (err, user) {

            if (user === null) {
              return done(null, false, { message: 'bad username' });
            }

            bcrypt.compare(password, user.password).then(response => {
              if (response !== true) {
                console.log('passwords do not match');
                return done(null, false, { message: 'passwords do not match' });
              }
              console.log('user found & authenticated');
              return done(null, user);
            });
          });
        } catch (err) {
          done(err);
        }
      },
    ),
  );

  passport.use(
    'register',
    new LocalStrategy(
      {
        usernameField: 'username',
        passwordField: 'password',
        session: false,
      },
      (username, password, done) => {
        console.log("progress");
        try {
            User.findOne({ username: username }, function (err, user) {

                console.log(user);
            if (user !== null) {
              return done(null, false, { message: 'username already taken' });
            }

            return done(null, true);
          });
        } catch (err) {
          done(err);
        }
      },
    ),
  );

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

const opts = {
    jwtFromRequest: ExtractJWT.fromAuthHeaderWithScheme('JWT'),
    secretOrKey: jwtSecret.secret,
  };
  
  passport.use(
    'jwt',
    new JWTstrategy(opts, (jwt_payload, done) => {
      try {
        User.findOne({
          where: {
            id: jwt_payload.id,
          },
        }).then(user => {
          if (user) {
            console.log('user found in db in passport');
            done(null, user);
          } else {
            console.log('user not found in db');
            done(null, false);
          }
        });
      } catch (err) {
        done(err);
      }
    }),
  );


module.exports = router 