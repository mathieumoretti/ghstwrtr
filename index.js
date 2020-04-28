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
const mainController = require('./controllers/mainController');
const sentenceController = require('./controllers/sentenceController');
const storyController = require('./controllers/storyController');
const storiesController = require('./controllers/storiesController');

app.use('/', mainController);
app.use('/sentence', sentenceController);
app.use('/story', storyController);
app.use('/stories', storiesController);


app.listen(PORT);
console.log(`Server started on port ${PORT}`);
