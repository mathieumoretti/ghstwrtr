const express = require('express');

var model = require('../model/model');

module.exports = (req, res) => {
    res.json({sentences: model.sentences});
  };