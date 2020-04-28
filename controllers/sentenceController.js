const _ = require('underscore');
const express = require('express');

var db = require('../data/models/index');
var promiseMaker = require('../scripts/promiseMaker');
var utils = require('../scripts/utils');

var router = express.Router();

function queryFindAllPromise(resolve, reject)
{
    const sentences = db.Sentence.findAll({
        limit: 10 ,
        attributes: ['content']
    });
    return resolve(sentences);
}

router.get('/', (req, res) => {
  var sentencesPromise = promiseMaker.make(queryFindAllPromise);
  sentencesPromise.then((result) =>{    
      var sentences = _.map(result, (x)=>{
          utils.note(x.content);
          return x.content;
      });
      res.render('sentence', { model: { sentences: sentences } });
  }).catch(
    (reject)=>
    {
      res.render('error',
      { 
        model:
        {
          err: "There's an error"
        }
      });
    });
});

module.exports = router;