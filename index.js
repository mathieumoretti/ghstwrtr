require('dotenv').config();
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
var redisClient = null;
var redisHost = 'localhost';
// Create Redis client on Redis port
if (process.env.NODE_ENV == 'development'){
   redisClient = redis.createClient(REDIS_PORT);
}
else if (process.env.NODE_ENV == 'staging'){
   redisHost = process.env.REDIS_URL
   redisClient = redis.createClient(redisHost);
}

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

//add routes
const storyController = require('./controllers/storyController');
const sentenceController = require('./controllers/sentenceController');


function IsLoggedIn(req, res, next) {
  console.log('Time:', Date.now());
  // create new session object.
  if (!req.session) {
    console.log("Not logged in.");
  }
  next();
}

app.get('/logout', IsLoggedIn, (req, res) => {
  if(req.session.key) {
    req.session.destroy(function(){
      console.log("Logged out.");
    });
  } else {
    console.log("Not even logged in.");
  }
});

// static files
var options = {
  index: "app.html",
}
app.use(express.static(path.join(__dirname, 'dist'), options));

// routes
app.get('/api/stories', storyController);
app.get('/api/sentences', sentenceController);

var email ="someEmail@some.com";

app.post('/login',function(req,res){
  // when user login set the key to redis.
  req.session.email=email;
  res.end('done');
});

app.listen(PORT);
console.log(`Server started on port ${PORT}`);
