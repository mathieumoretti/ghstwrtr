const express = require('express');
const console = require('console');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;

// add routes
const storyController = require('./controllers/storyController');
const sentenceController = require('./controllers/sentenceController');

// views - not sure
app.use(express.static(path.join(__dirname, 'dist')));

app.get('/api/stories', storyController);
app.get('/api/sentences', sentenceController);

// send the user to index html page inspite of the url
app.get('/', (req, res) => {
  res.sendFile(path.join(path.resolve(__dirname, 'dist'), 'app.html'));
});

app.listen(PORT);
console.log(`Server started on port ${PORT}`);
