// express hello world
const express = require('express');
const console = require('console');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// views
// app.set('views', './views');
// app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'client', 'dist')));

// send the user to index html page inspite of the url
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
});


// add routes
const mainController = require('./controllers/mainController');
const sentenceController = require('./controllers/sentenceController');
const storiesController = require('./controllers/storiesController');

app.use('/', mainController);
app.use('/sentence', sentenceController);
app.use('/stories', storiesController);

app.listen(PORT);
console.log(`Server started on port ${PORT}`);
