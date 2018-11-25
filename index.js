// express hello world
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;
// routes
app.get('/', (req, res) => {
  res.send('hello world!');
});
app.get('/stories', (req, res) => {
  res.send('stories');
});

app.listen(PORT);
