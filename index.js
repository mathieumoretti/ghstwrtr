// express hello world
const express = require('express');
const console = require('console');
const path = require('path');
// const _ = require('underscore');

const app = express();
const PORT = process.env.PORT || 5000;

// views
app.set('views', './views');
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, '/public')));


// add routes
var mainController = require(__dirname + "/controllers/mainController");
var sentenceController = require(__dirname + "/controllers/sentenceController");
var storyController = require(__dirname + "/controllers/storyController");
var storiesController = require(__dirname + "/controllers/storiesController");

app.use("/", mainController);
app.use("/sentence", sentenceController);
app.use("/story", storyController);
app.use("/stories", storiesController);


app.listen(PORT);
console.log('Server started');
