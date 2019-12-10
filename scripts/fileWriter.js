const fs = require('fs');
const error = require('./error');
const promiseMaker = require('./promiseMaker');
const utils = require('./utils');

var fileWriter = (function ()
{
  function write(filename, data)
  {   
      function asyncAction(resolve, reject)
      {
        function Result(){
            return {
                content: null,
                error: error.none,
            }
        };

        fs.writeFile(filename, data, 'utf8', function(err) {
            
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

            if (err) reject(err);
            else
            {
                resolve(filename + "file saved.")
            }
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