const fs = require('fs');

const error = require('./error');
const utils = require('./utils');
const promiseMaker = require('./promiseMaker');

function Result(){
    return {
        content: null,
        error: error.none,
    }
};

 var fileHandler = (function () {

    function mkdir(path, recursive)
    {
        return fs.promises.mkdir(path, { recursive: recursive });
    }

    function mkdir2(path, recursive)
    {
        function asyncAction(resolve, reject)
        {
            fs.mkdir(path, { recursive: recursive }, (err) => {

                var someProcessor = function(someError)
                {
                    // Concatenate args
                    var result = Result();
                    result.error = utils.existy(someError) ? error.some : error.none;
                    result.content = "SomeContent";
                    return result; 
                }

                var errorController = function(res)
                {
                    switch(res.error.code)
                    {
                        case "OK": resolve(res);
                        case "ERROR": reject(res.error);
                    }
                }

                var result = someProcessor(err);           
                errorController(result);
            });
        }

        return promiseMaker.make((resolve, reject) => {        
            asyncAction(resolve, reject)
        });
    }
    // {
    //     function asyncAction(resolve, reject)
    //     {
    //         function Result(){
    //             return {
    //                 content: null,
    //                 error: error.none,
    //             }

    //             var path = "bro";
    //             fs.mkdir(path, { recursive: true }, (err) => {

    //                 if (err)
    //                     throw err;

    //                 var someProcessor = function(someError)
    //                 {
    //                     // Concatenate args
    //                     var result = Result();
    //                     result.error = utils.existy(someError) ? error.some : error.none;
    //                     result.content = "SomeContent";
    //                     return result; 
    //                 }

    //                 var errorController = function(res)
    //                 {
    //                     switch(res.error.code)
    //                     {
    //                         case "OK": resolve(res);
    //                         case "ERROR": reject(res.error);
    //                     }
    //                 }

    //                 var result = someProcessor(err);           
    //                 errorController(result);            

    //                 if (err) reject(err);
    //                 else
    //                 {
    //                     resolve(filename + "file saved.")
    //                 }

    //         });

    //         }
            
    //         return promiseMaker.make((resolve, reject) => {        
    //             asyncAction(resolve, reject)
    //         });  
    // }

  return {
     // write: write,
      mkdir: mkdir,
      mkdir2: mkdir2,
  };
})();

module.exports = fileHandler;