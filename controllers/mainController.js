const express = require('express');
var router = express.Router();

var pg = require("pg");
var app = express();
 
const config = {
  user: 'postgres',
  database: 'ghstwrtr',
  port: 5432
};
var pool = new pg.Pool(config)
router.get('/', (req, res) => {
  pool.connect(function(err, client, done) {
    if(err){
        console.log("not able to get connection "+ err);
        res.status(400).send(err);
    } 
    client.query('SELECT * FROM student where id = $1', [1],function(err,result) {
        done(); // closing the connection;
        if(err){
            console.log(err);
            res.status(400).send(err);
        }
        //res.status(200).send(result.rows);
        res.status(200).render('index', { title: 'ghstwrtr' });
    });
  });

  //res.render('index', { title: 'ghstwrtr' });
});

router.get('/login', (req, res) => {
    res.render('login', { title: 'ghstwrtr' });
})




module.exports = router;
