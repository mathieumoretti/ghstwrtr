const fs = require('fs');

const error = require('./error');
const utils = require('./utils');

const AsyncAction = require('./asyncAction');
const ErrorController = require('./defaultController');
const ErrorProcessor = require('./errorProcessor');
const ResultProcessor = require('./resultProcessor');
const SuccessProcessor = require('./successProcessor');
const UnknownProcessor = require('./unknownProcessor');
const Result = require('./result');

const FileReadErrorProcessor = function(filename)
{
  UnknownProcessor.call(this);
  this.filename = filename;
}

FileReadErrorProcessor.prototype = Object.create(UnknownProcessor.prototype);

FileReadErrorProcessor.prototype.Process = function()
{
  switch(this.err.code)
  {
    case "EEXIST":
        utils.warn(this.err.message);
        return new Result(`File ${filename} " already exists.`, error.alreadyExists);
    default:
      utils.warn(this.err.message);
      return this.prototype.Process();
  }
}

const FileReadAction = function(filename)
{
  AsyncAction.call(this);
  this.filename = filename;
}

FileReadAction.prototype = Object.create(AsyncAction.prototype);

FileReadAction.prototype.Execute = function(resolve, reject)
{
  var filename = this.filename;
  fs.readFile(this.filename,'utf8', function(err, data) {
    // Could be a result processor and result controller.
    var freProcessor = new ErrorProcessor(err, new FileReadErrorProcessor(filename));
    var res = new ResultProcessor(freProcessor, new SuccessProcessor(data)).Process();
    return new ErrorController(resolve, reject).Control(res);
  }); 
};

module.exports = FileReadAction;