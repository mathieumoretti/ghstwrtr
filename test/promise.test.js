const test = require('tape');

const utils = require('../scripts/utils');
const error = require('../scripts/result/error');
const promiseMaker = require('../scripts/promiseMaker');

var createResult = function(){
    return {
        content: null,
        error: error.none,
    }
};

var someProcessor = function(someBool)
{
    // Concatenate args
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

var someAsyncFctGenerator = function(processor, processingArgs, controller)
{
    return function (resolve, reject)
    {
        var result = processor(processingArgs);
        if (controller(result.error)) {
            resolve(result.content);
        }
        else {
            reject(result.error);
        }
    }
}

test('promise creation', (t) => {
    var args = true;
    var someAsyncFct = someAsyncFctGenerator(someProcessor, args, errorController)
    var aPromise = promiseMaker.make(someAsyncFct);
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

//   var someProcessor2 = function(someBool)
//   {
//       var result = createResult();
//       result.error = someBool ? error.none : error.some;
//       result.content = "SomeContent";
//       return result; 
//   }

//   var errorController2 = function(result, resolve, reject)
//   {
//       switch(result.error.code)
//       {
//           case "OK": resolve(result.content);
//           case "ERROR": reject(result.error);
//       }
//   }

//   test('promise creation 2', (t) => {
//     var args = true;
//     var aPromise = promiseMaker.make(someProcessor2, args, errorController2);
//     //t.plan(0); 
//     aPromise.then((processed) => {
//         utils.note(processed);
//         t.equal(processed, "SomeContent");
//         t.end();
//     }).catch((err) => {
//             t.fail(err);
//             t.end();
//         }
//     );    
//   });

// function logg(resolve, reject)
// {
//     resolve(0);
//     reject(1);
// }

//   test('promise creation 3', (t) => {

//     var promise = promiseMaker.maker(logg);

//     promise.then(function(val) {
//         console.log(val); // 1
//         return val + 2;
//       }).then(function(val) {
//         console.log(val); // 3
//       })

//     // var aPromise = new Promise(promiseMaker.maker());
//     // aPromise.then(logg);
//     // t.equal(true, true);
//      t.end();
//   });
