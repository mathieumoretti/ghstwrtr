const fs = require('fs');
const error = require('./error');
const AsyncAction = require('./asyncAction');
const ErrorController = require('./defaultController');
const Processor = require('./processor');
const promiseMaker = require('./promiseMaker');
const Result = require('./result');
const SuccessfulResult = require('./successfulResult');
const UnknownResult = require('./unknownResult');
const utils = require('./utils');


const ErrorProcessor = function(err)
{
  Processor.call(this);
  this.err = err;
}

ErrorProcessor.prototype = Object.create(Processor.prototype);

ErrorProcessor.prototype.Process = function (filename, data) {    
    // Concatenate args

    if(utils.existy(this.err))
    {                        
        switch(this.err.code) {
          case "EEXIST":
            utils.warn(this.err.message);
            return new Result(`File ${filename} " already exists.`, error.alreadyExists);
          default:
            utils.warn(this.err.message);
            return new UnknownResult();
        }
    }
    return new SuccessfulResult(data);
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
    var res = new ErrorProcessor(err).Process(this.filename, data);
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