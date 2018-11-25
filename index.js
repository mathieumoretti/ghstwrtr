// express hello world
const express = require('express');

const app = express();

// routes
app.get('/', (req, res) => {
  res.send('hello world!');
});
app.get('/stories', (req, res) => {
  res.send('stories');
});

app.listen(5000);
