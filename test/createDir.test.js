const test = require('tape-catch')
const error = require('../scripts/error');
const handler = require('../scripts/fileHandler');
const writer = require('../scripts/fileWriter');


function testCloser(t)
{
    t.end();
}

test('create Dir promise', (t) => {
    var tmp = "someTmp";
    var promise = handler.mkdir2(tmp, true);

    promise.then(
        (resolve, reject) =>
        {
            var result = resolve;            
            console.log(result);
            t.equal(result.error.code, error.none.code);
            testCloser(t);
        });
  });

  test('create Dir + create Another2', (t) => {
    var tmp = "someTmp";
    var promise = handler.mkdir2(tmp, true);
    var promiseAfter = handler.mkdir2(tmp + 1, true);   

    promise.then(promiseAfter).
            then((resolve) =>
            {
                console.log(resolve);
                t.equal(resolve.error.code, error.none.code);
                testCloser(t);
            },
            (reject) =>
            {          
                console.log(reject);
                t.end();
            });
    });

