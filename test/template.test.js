const test = require('tape-catch');
const path = require('path');

const testUtils = require('./testUtils');
const utils = require('../scripts/utils');
const promiseMaker = require('../scripts/promiseMaker');
var rootDir = `${utils.rootDir}`;

test("Test name.", (t) => {
    var promise = promiseMaker.make((resolve, reject)=>{
        resolve("Promise away!");
    });
    promise.then((result) =>
    {
        console.log(result);
        t.pass();
        testUtils.testCloser(t);
    }).catch(
        (reject) =>
        {          
            console.log(reject);
            testUtils.testCloser(t);
     });
});