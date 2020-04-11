const fs = require('fs');

const error = require('./error');
const Result = require('./result');
const utils = require('./utils');
const promiseMaker = require('./promiseMaker');
const fileWriter = require('./fileWriter');
const fileReader = require('./fileReader');

 var fileHandler = (function () {

    function write(filename, data)
    {
        return fileWriter.write(filename, data);
    }

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
                    if(utils.existy(someError))
                    {                        
                        switch(someError.code) {
                          case "EEXIST":
                            utils.warn(someError.message);
                            return new Result(`Directory ${path} already exists.`, error.alreadyExists);
                            break;

                          default:
                            utils.warn(someError.message);
                            new Result("Unknown.", error.unknown);
                        }
                    }

                    return new Result(`Directory ${path} " created.`, error.none); 
                }

                var errorController = function(res)
                {
                    switch(res.error.code)
                    {
                        case "OK": 
                        case "ALREADY_EXISTS": resolve(res);
                            break;
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
    }

    function read(filename)
    {
        return fileReader.read(filename);
    }

  return {
      write: write,
      mkdir: mkdir,
      mkdir2: mkdir2,
      read: read,
  };
})();

module.exports = fileHandler;