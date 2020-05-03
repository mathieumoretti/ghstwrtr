const express = require('express');
var router = express.Router();



router.get('/', (req, res) => {
    res.render('index', { title: 'ghstwrtr' });
  });

// router.get('/', isLoggedIn, function(req, res) {
//     res.sendFile(path.join(__dirname, '../', 'public', 'html', 'dashboard.html'), {
//         user : req.user // get the user out of session and pass to template
//     });
// });


router.get('/login', (req, res) => {
    res.render('login', { title: 'ghstwrtr' });
})

module.exports = router;
