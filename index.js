require('dotenv').config();
const express = require('express');
var redis   = require("redis");
var session = require('express-session');
var redisStore = require('connect-redis')(session);

const console = require('console');
const path = require('path');

var client  = redis.createClient();
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


app.get('/logout', IsLoggedIn, (req, res) => {
  if(req.session.key) {
    req.session.destroy(function(){
      res.redirect('/');
    });
  } else {
      res.redirect('/');
  }


  // res.sendFile(path.join(path.resolve(__dirname, 'dist'), 'login.html'));
  // req.session.destroy(function(err) {
  //   // cannot access session here
  //   console.log("session destroyed!")
  // })
});

app.use('/', IsLoggedIn);

// views
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/stories', storyController);
app.get('/api/sentences', sentenceController);

app.get('/home',function(req,res){
  if(req.session.email) {
      res.json({ email : req.session.email});
  } else {
      res.redirect("/");
  }
});

var email ="someEmail@some.com";

app.post('/login',function(req,res){
  // when user login set the key to redis.
  req.session.email=email;
  res.end('done');
});

app.get('/logout',function(req,res){
  req.session.destroy(function(err){
      if(err){
          console.log(err);
      } else {
          res.redirect('/');
      }
  });
});

// send the user to index html page inspite of the url
app.get('/', IsLoggedIn, (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname, 'dist'), 'app.html'));
});

app.listen(PORT);
console.log(`Server started on port ${PORT}`);
