const express = require('express');
var router = express.Router();


const Sentence = require('../models/sentence')

const sentence = Sentence;
router.get('/', (req, res) => {
  res.render('sentence', sentence);
});

module.exports = router;
