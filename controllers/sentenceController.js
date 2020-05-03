const express = require('express');

var model = require('../model/model');

var router = express.Router();

router.get('/', (req, res) => {
    res.render('sentence', { model: { sentences: model.sentences } });
});

module.exports = router;