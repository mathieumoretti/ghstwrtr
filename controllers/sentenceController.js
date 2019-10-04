const express = require('express');
var router = express.Router();


const Sentence = require('../models/sentence')


router.get('/', (req, res) => {
    const sentence = Sentence();
    sentence.content = "My first sentence."
    res.render('sentence', { model: sentence });
});

module.exports = router;
