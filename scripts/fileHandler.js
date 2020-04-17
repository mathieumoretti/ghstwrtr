const fs = require('fs');

const AsyncAction = require('./asyncAction');
const error = require('./error');
const ErrorController = require('./defaultController');
const fileWriter = require('./fileWriter');
const fileReader = require('./fileReader');
const Processor = require('./processor');
const promiseMaker = require('./promiseMaker');
const Result = require('./result');
const SuccesfulResult = require('./succesfulResult');
const UnknownResult = require('./unknownResult');
const utils = require('./utils');


const ErrorProcessor = function(err)
{
  Processor.call(this);
  this.err = err;
}

ErrorProcessor.prototype = Object.create(Processor.prototype);

ErrorProcessor.prototype.Process = function (path) {    
    // Concatenate args

    if(utils.existy(this.err))
    {                        
        switch(this.err.code) {
          case "EEXIST":
            utils.warn(this.err.message);
            return new Result(`Directory ${path} already exists.`, error.alreadyExists);
          default:
            utils.warn(this.err.message);
            return new UnknownResult();
        }
    }
    return new SuccesfulResult(`Directory ${path} " created.`);
}

const DirectoryCreateAction = function(path, recursive)
{
  AsyncAction.call(this);
  this.path = path;
  this.recursive = recursive;
}

DirectoryCreateAction.prototype = Object.create(AsyncAction.prototype);

DirectoryCreateAction.prototype.Execute = function(resolve, reject)
{
    fs.mkdir(this.path, { recursive: thisrecursive }, (err) => {
        // Could be a result processor and result controller.
        var res = new ErrorProcessor(err).Process(this.path);
        new ErrorController(resolve, reject).Control(res);
  }); 
};

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
        return promiseMaker.make((resolve, reject) => {        
            new DirectoryCreateAction(path, recursive).Execute(resolve, reject);
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