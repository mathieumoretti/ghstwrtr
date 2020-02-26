const fs = require('fs');
const error = require('./error');
const result = require('./result');
const promiseMaker = require('./promiseMaker');
const utils = require('./utils');


var fileReader = (function ()
{
  function read(filename, callback = null)
  {   
      function asyncAction(resolve, reject)
      {
        fs.readFile(filename,'utf8', function(err, data) {
            
            var someProcessor = function(someError)
            {
                // Concatenate args
                var res = result.Result();

                if(utils.existy(someError))
                {                        
                    switch(someError.code) {
                      case "EEXIST":
                        res.error = error.alreadyExists;
                        res.intCode = someError.number;   
                        res.content = `File ${filename} " already exists.`; // Should never happen
                        utils.warn(someError.message);
                        break;

                      default:
                        res.error = error.unknown;
                        utils.fail(someError.message);
                    }
                }

                res.content = data;
                return res; 
            }

            var errorController = function(res)
            {
                switch(res.error.code)
                {
                    case "OK": resolve(res);
                    case "ERROR": reject(res.error);
                }
            }

            var res = someProcessor(err);
            errorController(res);
        }); 
      }

      return promiseMaker.make((resolve, reject) => {        
        asyncAction(resolve, reject)
      });      
  };

  return {
      read: read,
  };
})();

module.exports = fileReader;