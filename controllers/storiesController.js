const express = require('express');
var router = express.Router();

const newspaper = require('../models/newspaper')

router.get('/', (req, res) => {
  res.render('stories', { model : newspaper });
});

router.get('/story/:storyId', (req, res) => {
  const story = (req.params.storyId) ? newspaper.secondaryStories[req.params.storyId] : newspaper.secondaryStories[0];
  res.render('story', story);
});

module.exports = router;
