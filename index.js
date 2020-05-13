// express hello world
const express = require('express');
const console = require('console');
const path = require('path');



const redis = require("redis");
const session = require('express-session');
var redisStore = require('connect-redis')(session);
const REDIS_PORT = process.env.REDIS_PORT || 6379;

//Create Redis client on Redis port
const redisClient = redis.createClient(REDIS_PORT);

const app = express();
const PORT = process.env.PORT || 5000;

// views
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));

// sesh
app.use(session({
    secret: 'sesshhhhh',
    // create new redis store.
    store: new redisStore({ host: 'localhost', port: REDIS_PORT, client: redisClient, ttl :  260}),
    saveUninitialized: false,
    resave: false
}));

function IsLoggedIn(req, res, next) {
    console.log('Time:', Date.now());
    // create new session object.
    if(!req.session)
    {
        res.render("error", {model:{err: "SUp error"}});
    }
    console.log(req.session);
    next();
}

app.use("/", IsLoggedIn);

// add routes
const mainController = require('./controllers/mainController');
const sentenceController = require('./controllers/sentenceController');
const storiesController = require('./controllers/storiesController');

app.use('/', IsLoggedIn, mainController);
app.use('/sentence', sentenceController);
app.use('/stories', storiesController);

app.listen(PORT);
console.log(`Server started on port ${PORT}`);
