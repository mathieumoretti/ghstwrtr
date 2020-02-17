const test = require('tape-catch')
const error = require('../scripts/error');
const handler = require('../scripts/fileHandler');


function testCloser(t)
{
    t.end();
}

  test('create Dir + write file', (t) => {
    var tmp = "someTmp";
    var promise = handler.mkdir2(tmp, true);

    promise.then(
        (resolve) =>
        {
            var result = resolve;  
            handler.write(tmp + "/" + "someFile.txt", result.content);
           
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