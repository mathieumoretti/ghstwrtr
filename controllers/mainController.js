const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    res.render('index', { title: 'ghstwrtr' });
  });

router.get('/login', (req, res) => {
    res.render('login', { title: 'ghstwrtr' });
})

module.exports = router;
