const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { v4: uuidv4 } = require('uuid');
const session = require('express-session');
const passport = require('passport')
const LocalStrategy = require('passport-local').Strategy;
const FileStore = require('session-file-store')(session);

const cors = require('cors');
const path = require('path')
const app = express();
require('./database');

const cookie_name = "divingscore";
const cookie_secret = "dirtbike";

app.use(cookieParser());
app.use(bodyParser.json());
app.use(session({
    genid: (req) => {
        console.log('Inside session middleware genid function')
        console.log(`Request object sessionID from client: ${req.sessionID}`)
        return uuidv4() // use UUIDs for session IDs
      },
    store: new FileStore(),
    secret: cookie_secret,
    name: cookie_name,
    resave: false,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
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

app.use((req, res, next) => {
   if (req.headers['host'] !== 'localhost:8080' && req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
        next();
    }
  });

app.use(express.static(path.join(__dirname, '../build')))
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build'))
})

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});