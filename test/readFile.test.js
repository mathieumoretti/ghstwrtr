const test = require('tape-catch')
const error = require('../scripts/error');
const handler = require('../scripts/fileHandler');

function testCloser(t)
{
    t.end();
}

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
