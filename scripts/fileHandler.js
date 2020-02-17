const fs = require('fs');

const error = require('./error');
const result = require('./result');
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
                    var res = result.Result();
    
                    if(utils.existy(someError))
                    {                        
                        switch(someError.code) {
                          case "EEXIST":
                            res.error = error.alreadyExists;
                            res.intCode = someError.number;   
                            res.content = `Directory ${path} already exists.`;                         
                            utils.warn(someError.message);
                            break;

                          default:
                            res.error = error.unknown;
                            utils.fail(someError.message);
                        }
                    }
    
                    res.content = `Directory ${path} " created.`;
                    return res; 
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