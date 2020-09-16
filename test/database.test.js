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


const users = db.User.findAll({
    limit: 10 ,
    attributes: ['name', 'email']
});
function queryPromise2(resolve, reject)
{
    return resolve(users);
}

test("Test database user.", (t) => {
    var promise = promiseMaker.make(queryPromise2);

    promise.then((result) =>{    
        var userNames = _.map(result, (x)=>{
            utils.note(x.name);
            return x.name;
        });
        var emails = _.map(result, (x)=>{
            utils.note(x.email);
            return x.email;
        });

        t.equals(userNames[0].toString(), 'admin');
        t.equals(emails[0].toString(), 'admin@admin.com');
        t.pass();
        testUtils.testCloser(t);
    }).catch(
        (reject) =>
        {          
            console.log(reject);
            testUtils.testCloser(t);
     });
});
