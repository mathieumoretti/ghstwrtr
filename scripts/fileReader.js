const fs = require('fs');
const error = require('./error');
const Result = require('./result');
const UnknownResult = require('./unknownResult');
const promiseMaker = require('./promiseMaker');
const utils = require('./utils');
const AsyncAction = require('./asyncAction');
const Controller = require('./controller');
const Processor = require('./processor');

const ErrorController = function(resolve, reject)
{
  Controller.call(this, resolve, reject);
}

// More like a Default Controller
ErrorController.prototype = Object.create(Controller.prototype);
ErrorController.prototype.Control = function(result){
  switch(result.error.code)
  {
      case "OK": this.resolve(result);
      case "ERROR": this.reject(result.error);
  }
}

const ErrorProcessor = function()
{
  Processor.call(this);
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
            return new UnknownResult();
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
    // Could be a result processor and result controller.
    var res = new ErrorProcessor().Process(data, err);
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