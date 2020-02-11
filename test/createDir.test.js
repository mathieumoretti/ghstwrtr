const test = require('tape');

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
        },
        (reject) =>
        {          
            console.log(reject);
            testCloser(t);
        });
        
  });

  test('create Dir + write file + read file', (t) => {
    var tmp = "someTmp";
    var promise = handler.mkdir2(tmp, true);

    var fileName = tmp + "/" + "someFile.txt";
    
    var content = "SomeContent";

    promise.then((resolve) =>
    {       
        var writeFilePromise = handler.write(fileName, content);
        return writeFilePromise;
    }
    ).then(
        (resolve) =>{
            var result = resolve;  
            return handler.read(tmp + "/" + "someFile.txt", result.content); 
        }).then(
            (resolve) => {
                var result = resolve;
                t.equal(result.content, content);
                testCloser(t);
            }
        ).catch(
            (reject) =>
            {          
                console.log(reject);
                testCloser(t);
            }
        );
        
  });


  test('create Dir + create Another', (t) => {
    var tmp = "someTmp";
    var promise = handler.mkdir2(tmp, true);
    var promiseAfter = handler.mkdir2(tmp + 1, true)
    promise.then(promiseAfter).then(
        (resolve) =>
        {
            var result = resolve;
            var alreadyExists = (result.error.code == error.alreadyExists.code);
            t.true(!alreadyExists);
            return handler.write(tmp + "/" + "someFile.txt", result.content);
        }).then((resolve)=>
        {
            var result = resolve;
            var alreadyExists = (result.error.code == error.alreadyExists.code);
            t.true(!alreadyExists);
            testCloser(t);
        })
        .catch(
        (reject) =>
        {          
            console.log(reject);
            testCloser(t);
        }
        );
        
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
                    testCloser(t);
                },
                (reject) =>
                {          
                    console.log(reject);
                    t.end();
                }
            );
    });

