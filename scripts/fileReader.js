const fs = require('fs');
const error = require('./error');
const Result = require('./result');
const promiseMaker = require('./promiseMaker');
const utils = require('./utils');
const AsyncAction = require('./asyncAction');
const Controller = require('./controller');
const Processor = require('./processor');

const ErrorController = function(resolve, reject)
{
  Controller.call(this, resolve, reject);
}

ErrorController.prototype = Object.create(Controller.prototype);
ErrorController.prototype.Control = function(result){
  switch(result.error.code)
  {
      case "OK": this.resolve(result);
      case "ERROR": this.reject(result.error);
  }
}

const ErrorProcessor = function(error)
{
  Processor.call(this, error);
}

ErrorProcessor.prototype = Object.create(Processor.prototype);

ErrorProcessor.prototype.Process = function (processable, err) {    
    // Concatenate args

    if(utils.existy(err))
    {                        
        switch(err.code) {
          case "EEXIST":
            utils.warn(err.message);
            return new Result(`File ${this.filename} " already exists.`, error.alreadyExists);
          default:
            utils.warn(err.message);
            return new Result(`Unknown.`, error.unknown);
        }
    }
    return new Result(processable, error.none);
}

const FileReadAction = function(filename)
{
  AsyncAction.call(this);
  this.filename = filename;
}

FileReadAction.prototype = Object.create(AsyncAction.prototype);

FileReadAction.prototype.Execute = function(resolve, reject)
{
  fs.readFile(this.filename,'utf8', function(err, data) {
    var res = new ErrorProcessor(err).Process(data, err);
    new ErrorController(resolve, reject).Control(res);
}); 
};

var fileReader = (function ()
{
  function read(filename, callback = null)
  {
      return promiseMaker.make((resolve, reject) => {        
        new FileReadAction(filename).Execute(resolve, reject);
      });      
  };

  return {
      read: read,
  };
})();

module.exports = fileReader;