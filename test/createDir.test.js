const test = require('tape');

const error = require('../scripts/error');
const handler = require('../scripts/fileHandler');

test('create Dir promise', (t) => {
    var tmp = "someTmp";
    var promise = handler.mkdir2(tmp, true);

    promise.then(
        (resolve, reject) =>
        {
            var result = resolve
            
            console.log(result);
            //t.equal(error.none.code, "OK");
            t.equal(result.error.code, error.none.code);
            t.end();
        });
  });