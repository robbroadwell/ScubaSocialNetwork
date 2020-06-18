const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const passport = require('passport')
require('./api/passport'); // run config

const cors = require('cors');
const path = require('path')
const app = express();
require('./database');

app.use(cookieParser());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(cors());

passport.serializeUser(function(user, done) {
    done(null, user);
  });
  
passport.deserializeUser(function(user, done) {
    done(null, user);
  });

const users = require('./api/users');
app.use('/api/users', users);

const diveSites = require('./api/diveSites');
app.use('/api/dive-sites', diveSites);

const feedback = require('./api/feedback');
app.use('/api/feedback', feedback);

app.use((req, res, next) => {
   if (req.headers['host'] !== 'localhost:8080' && req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
        next();
    }
  });

app.use(express.static(path.join(__dirname, '../build')))
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'))
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});