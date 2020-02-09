const test = require('tape');

const error = require('../scripts/error');
const handler = require('../scripts/fileHandler');
const writer = require('../scripts/fileWriter');

test('create Dir promise', (t) => {
    var tmp = "someTmp";
    var promise = handler.mkdir2(tmp, true);

    promise.then(
        (resolve, reject) =>
        {
            var result = resolve;            
            console.log(result);
            t.equal(result.error.code, error.none.code);
            t.end();
        });
  });

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
            t.end();
        },
        (reject) =>
        {          
            console.log(reject);
            t.end();
        });
        
  });

  test('create Dir + create Another', (t) => {
    var tmp = "someTmp";
    var promise = handler.mkdir2(tmp, true);
    var promiseAfter = handler.mkdir2(tmp + 1, true)
    promise.then(promiseAfter).then(
        (resolve) =>
        {
            var result = resolve;  
            handler.write(tmp + "/" + "someFile.txt", result.content);
           
            var alreadyExists = (result.error.code == error.alreadyExists.code);
            t.true(alreadyExists);
            t.end();
        },
        (reject) =>
        {          
            console.log(reject);
            t.end();
        });
        
  });

  test('create Dir + create Another2', (t) => {
    var tmp = "someTmp";
    var promise = handler.mkdir2(tmp, true);
    var promiseAfter = handler.mkdir2(tmp + 1, true);   

    promise.then(promiseAfter)
            .then((resolve)=>
            {
                var promiseWriteFile = writer.write(tmp + "/" + "someFile.txt", resolve.content);
                return promiseWriteFile
            })
            .then((resolve) =>
                {
                    console.log(resolve);
                    t.equal(resolve.error.code, error.none.code);
                    t.end();
                },
                (reject) =>
                {          
                    console.log(reject);
                    t.end();
                }
            );
    });

