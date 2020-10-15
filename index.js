require('dotenv').config();
const express = require('express');
const console = require('console');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;
const bodyParser = require('body-parser');

// redis
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const REDIS_PORT = process.env.REDIS_PORT || 6379;
let redisClient = null;
let redisHost = 'localhost';
// Create Redis client on Redis port
if (process.env.NODE_ENV === 'development') {
  redisClient = redis.createClient(REDIS_PORT);
} else if (process.env.NODE_ENV === 'staging') {
  redisHost = process.env.REDIS_URL;
  redisClient = redis.createClient(redisHost);
}

// utils
const utils = require('./scripts/utils');

// database
const db = require('./data/models/index');

// sesh
app.use(session({
  secret: 'sesshhhhh',
  // create new redis store.
  store: new RedisStore({
    host: redisHost,
    port: REDIS_PORT,
    client: redisClient,
    ttl: 260,
  }),
  saveUninitialized: false,
  resave: false,
}));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// add routes
const { storiesController } = require('./controllers/storiesController');
const { storyController } = require('./controllers/storiesController');
const sentenceController = require('./controllers/sentenceController');

// static files
app.use(express.static(path.join(__dirname, '/dist')));

// routes
function InternalIsLoggedIn(req) {
  if (!utils.existy(req.session.email)) {
    console.log('Not logged in.');
    return false;
  }
  console.log('Logged in.');
  return true;
}

function IsLoggedIn(req, res, next) {
  console.log('Time:', Date.now());
  // create new session object.
  if (!InternalIsLoggedIn(req)) {
    res.json({ error: 'true', message: 'Login failed! Please register.' });
  }
  next();
}

app.get('/api/stories', IsLoggedIn, storiesController);
app.get('/api/story/:storyId', IsLoggedIn, storyController);
app.get('/api/sentences', IsLoggedIn, sentenceController);

app.get('/logout', (req, res) => {
  if (utils.existy(req.session.email)) {
    req.session.destroy(() => {
      console.log('Logged out.');
      res.json({ error: 'false', message: 'Logout success.' });
    });
  } else {
    console.log('Not even logged in.');
    res.json({ error: 'true', message: 'Not even logged in.' });
  }
});

app.get('/loggedin', (req, res) => {
  if (!InternalIsLoggedIn(req)) {
    res.json({ error: 'true', message: 'Not logged in! Please register' });
  }
  res.json({ error: 'false', message: 'Logged in.' });
});

app.post('/login', (req, res) => {
  if (utils.existy(req.body.email)) {
    let user = null;
    db.User.findOne({ where: { email: req.body.email } })
      .then((foundUser) => {
        user = foundUser;
        if (user === null) {
          res.json({ error: 'true', message: 'Login failed! Please register.' });
        } else {
          req.session.email = user.email;
          res.json({ error: 'false', message: 'Login success.' });
        }
      }, () => {
        res.json({ error: 'true', message: 'Database error occured' });
      });
  } else {
    res.json({ error: 'true', message: 'Login failed! Invalid email.' });
  }
});

// send the user to index html page inspite of the url`
app.get('*', (req, res) => {
  // console.log('Normal');
  // console.log(`Original Url:${req.originalUrl}`);
  // console.log(`Referrer:${req.get('Referrer')}`);
  // console.log(`File sent:${path.join(path.resolve(__dirname, 'dist'), 'app.html')}`);
  res.sendFile(path.join(path.resolve(__dirname, 'dist'), 'app.html'));
});

app.listen(PORT);
console.log(`Server started on port ${PORT}`);
