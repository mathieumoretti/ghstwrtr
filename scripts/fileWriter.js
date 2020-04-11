const fs = require('fs');
const error = require('./error');
const Result = require('./result');
const promiseMaker = require('./promiseMaker');
const utils = require('./utils');


var fileWriter = (function ()
{
  function write(filename, data, encoding)
  {
    var aEncoding = encoding || 'utf8';
      function asyncAction(resolve, reject)
      {
        fs.writeFile(filename, data, aEncoding, function(err) {
            
            var someProcessor = function(someError)
            {
                // Concatenate args
                if(utils.existy(someError))
                {                        
                    switch(someError.code) {
                      case "EEXIST":
                        utils.warn(someError.message);
                        return new Result(`File ${filename} already exists.`, error.alreadyExists);
                      default:
                        utils.warn(someError.message);
                        return new Result(`Unknown.`, error.unknown);
                    }
                }

                return new Result(`File ${filename} " written.`, error.none); 
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
      write: write,
  };
})();

module.exports = fileWriter;