const test = require('tape-catch');
const error = require('../scripts/error');
const utils = require('../scripts/utils');
const testUtils = require('./testUtils');
const handler = require('../scripts/fileHandler');

var testCloser = testUtils.testCloser;

test('create Dir promise', (t) => {
    var tmp = utils.rootDir + "/someTmp";
    var promise = handler.mkdir2(tmp, true);

    promise.then(
        (resolve) =>
        {
            var result = resolve;            
            console.log(result);
            var isCreated = (result.error.code == error.none.code) || (result.error.code == error.alreadyExists.code);
            t.true(isCreated);
            testCloser(t);
        }).catch(
            (reject) =>
            {          
                console.log(reject);
                testCloser(t);
            }
        );
  });

  test('create Dir + create Another2', (t) => {
    var tmp = utils.rootDir + "/someTmp";
    var promise = handler.mkdir2(tmp, true);
    var promiseAfter = handler.mkdir2(tmp + 1, true);   

    promise.then(promiseAfter).
            then((resolve) =>
            {
                var result = resolve; 
                console.log(resolve);
                var isCreated = (result.error.code == error.none.code) || (result.error.code == error.alreadyExists.code);
                t.true(isCreated);
                testCloser(t);
            }).catch(
                (reject) =>
                {          
                    console.log(reject);
                    testCloser(t);
                }
            );
    });

