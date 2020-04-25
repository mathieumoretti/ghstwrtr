const test = require('tape-catch');
const path = require('path');
const _ = require('underscore');

const testUtils = require('./testUtils');
const utils = require('../scripts/utils');
const promiseMaker = require('../scripts/promiseMaker');
var rootDir = `${utils.rootDir}`;

var db = require('../data/models/index');

const sentences = db.Sentence.findAll({
    limit: 10 ,
    attributes: ['content']
});
function queryPromise(resolve, reject)
{
    return resolve(sentences);
}

test("Test database sentence.", (t) => {
    var promise = promiseMaker.make(queryPromise);

    promise.then((result) =>{    
        var sentences = _.map(result, (x)=>{
            utils.note(x.content);
            return x.content;
        });
        t.equal(sentences[0], "In the beginning God created the heaven and the earth.");
        t.pass();
        testUtils.testCloser(t);
    }).catch(
        (reject) =>
        {          
            console.log(reject);
            testUtils.testCloser(t);
     });
});