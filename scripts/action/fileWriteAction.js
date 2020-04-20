const fs = require('fs');

const error = require('../error');
const utils = require('../utils');

const AsyncAction = require('./asyncAction');
const ErrorController = require('../controller/defaultController');
const ErrorProcessor = require('../errorProcessor');
const ResultProcessor = require('../processor/resultProcessor');
const SuccessProcessor = require('../processor/successProcessor');
const UnknownProcessor = require('../processor/unknownProcessor');
const Result = require('../result');

const FileWriteErrorProcessor = function(filename)
{
  UnknownProcessor.call(this);
  this.filename = filename;
}

FileWriteErrorProcessor.prototype = Object.create(UnknownProcessor.prototype);

FileWriteErrorProcessor.prototype.Process = function()
{
  switch(this.err.code)
  {
    case "EEXIST":
        utils.warn(this.err.message);
        return new Result(`File ${filename} already exists.`, error.alreadyExists);
    default:
      utils.warn(this.err.message);
      return this.prototype.Process();
  }
}

const FileWriteAction = function(filename, data, encoding)
{
  AsyncAction.call(this);
  this.filename = filename;
  this.data = data;
  this.encoding = encoding;
}

FileWriteAction.prototype = Object.create(AsyncAction.prototype);

FileWriteAction.prototype.Execute = function(resolve, reject)
{
  fs.writeFile(this.filename, this.data, this.encoding, function(err)
  {
     // Could be a result processor and result controller.
     var freProcessor = new ErrorProcessor(err, new FileWriteErrorProcessor(this.filename));
     var res = new ResultProcessor(freProcessor, new SuccessProcessor(`File ${this.filename} written.`)).Process();
     return new ErrorController(resolve, reject).Control(res);
  });
};

module.exports = FileWriteAction;