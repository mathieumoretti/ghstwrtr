const fs = require('fs');

const error = require('../result/error');
const utils = require('../utils');

const TxtFileReadAction = require('./fileReadAction');
const ErrorController = require('../controller/defaultController');
const ErrorProcessor = require('../processor/errorProcessor');
const ResultProcessor = require('../processor/resultProcessor');
const SuccessProcessor = require('../processor/successProcessor');
const UnknownProcessor = require('../processor/unknownProcessor');
const Result = require('../result/result');

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

TxtFileReadAction.prototype.Execute = function(resolve, reject)
{
  var filename = this.filename;
  fs.readFile(filename,'utf8', function(err, data) {
    // Could be a result processor and result controller.
    var freProcessor = new ErrorProcessor(err, new FileReadErrorProcessor(filename));
    var res = new ResultProcessor(freProcessor, new SuccessProcessor(data)).Process();
    return new ErrorController(resolve, reject).Control(res);
  }); 
};

module.exports = TxtFileReadAction;