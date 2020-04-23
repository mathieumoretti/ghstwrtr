const fs = require('fs');

const error = require('../result/error');
const utils = require('../utils');

const AsyncAction = require('./asyncAction');
const ErrorController = require('../controller/defaultController');
const ErrorProcessor = require('../processor/errorProcessor');
const ResultProcessor = require('../processor/resultProcessor');
const SuccessProcessor = require('../processor/successProcessor');
const UnknownProcessor = require('../processor/unknownProcessor');
const Result = require('../result/result');

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
  var filename = this.filename;
  fs.writeFile(filename, this.data, this.encoding, function(err)
  {
     // Could be a result processor and result controller.
     var freProcessor = new ErrorProcessor(err, new FileWriteErrorProcessor(filename));
     var res = new ResultProcessor(freProcessor, new SuccessProcessor(`File ${filename} written.`)).Process();
     return new ErrorController(resolve, reject).Control(res);
  });
};

module.exports = FileWriteAction;