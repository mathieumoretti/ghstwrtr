const express = require('express');
const console = require('console');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;

// redis
const redis = require('redis');
const session = require('express-session');
const RedisStore = require('connect-redis')(session);

const REDIS_PORT = process.env.REDIS_PORT || 6379;

// Create Redis client on Redis port
const redisClient = redis.createClient(REDIS_PORT);

// sesh
app.use(session({
  secret: 'sesshhhhh',
  // create new redis store.
  store: new RedisStore({
    host: 'localhost',
    port: REDIS_PORT,
    client: redisClient,
    ttl: 260,
  }),
  saveUninitialized: false,
  resave: false,
}));

// add routes
const storyController = require('./controllers/storyController');
const sentenceController = require('./controllers/sentenceController');


function IsLoggedIn(req, res, next) {
  console.log('Time:', Date.now());
  // create new session object.
  if (!req.session) {
    res.sendFile(path.join(path.resolve(__dirname, 'dist'), 'login.html'));
  }
  console.log(req.session);
  next();
}

app.use('/', IsLoggedIn);

// views
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/stories', storyController);
app.get('/api/sentences', sentenceController);

// send the user to index html page inspite of the url
app.get('/', IsLoggedIn, (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname, 'dist'), 'app.html'));
});

app.listen(PORT);
console.log(`Server started on port ${PORT}`);
