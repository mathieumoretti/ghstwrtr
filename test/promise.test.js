const test = require('tape');

const utils = require('../scripts/utils');
const error = require('../scripts/error');
const promiseMaker = require('../scripts/promiseMaker');

var createResult = function(){
    return {
        content: null,
        error: error.none,
    }
};

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
var args = true;
var aPromise = promiseMaker.make(someProcessor, args, errorController);

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