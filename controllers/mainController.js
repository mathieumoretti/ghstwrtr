const express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
  let page_views = 0;
  if(req.session.page_views){
    page_views = req.session.page_views++;    
  } else {
    page_views =  req.session.page_views = 1;
  }
  
  res.render('index', {
    model:
    {
      title: 'ghstwrtr',
      page_views: page_views
    },
  });
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
