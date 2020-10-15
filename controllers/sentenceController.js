const express = require('express');

var model = require('../model/model');

module.exports = (req, res) => {
    console.log('Sentence');
    console.log(`Original Url:${req.originalUrl}`);
    console.log(`Referrer:${req.get('Referrer')}`);    
    res.json({sentences: model.sentences});
  };