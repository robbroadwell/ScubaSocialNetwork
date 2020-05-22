const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path')
const app = express();
require('./database');

app.use(bodyParser.json());
app.use(cors());

const users = require('./api/users');
app.use('/api/users', users);

const diveSites = require('./api/diveSites');
app.use('/api/dive-sites', diveSites);

app.use((req, res, next) => {
   if (req.headers['host'] !== 'localhost:8080' && req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`)
    } else {
        app.use(express.static(path.join(__dirname, '../build')))
        app.get('*', (req, res) => {
            res.sendFile(path.join(__dirname, '../build'))
        })
        next();
    }
  });

const port = process.env.PORT || 8080;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});