// express hello world
const express = require('express');

const app = express();
const PORT = process.env.PORT || 5000;

//views
app.set('views', './views')
app.set('view engine', 'pug')

// routes
app.get('/', (req, res) => {
  res.render('index', { title: 'Hey', message: 'Hello there!' })
});
app.get('/stories', (req, res) => {
  res.send('stories');
});

app.listen(PORT);
