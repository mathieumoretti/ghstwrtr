const test = require('tape');

const utils = require('../scripts/utils');
const error = require('../scripts/error');

var createResult = function(){
    return {
        content: null,
        error: error.none,
    }
};

var promiseMaker = function (processor, processingArgs, controller)
{
    var promise = new Promise(function(resolve, reject) {
        // do a thing, possibly async, then…
        var result = processor(processingArgs);
        if (controller(result.error)) {
            resolve(result.content);
        }
        else {
            reject(error);
        }
    });
    return promise;
}

var someProcessor = function(someBool)
{
    var result = createResult();
    result.error = someBool ? error.none : error.some;
    result.content = "SomeContent";
    return result; 
}

var errorController = function(error)
{
    switch(error.code)
    {
        case "OK": return true;
        case "ERROR": return false;
    }
}

var aPromise = promiseMaker(someProcessor, false, errorController);

test('promise creation', (t) => {
    //t.plan(0); 
    aPromise.then((processed) => {
        utils.note(processed);
        t.equal(processed, "SomeContent");
        t.end();
    }).catch((err) => {
            t.fail(err);
            t.end();
        }
    );    
  });