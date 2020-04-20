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

const DirectoryCreateErrorProcessor = function(path)
{
  UnknownProcessor.call(this);
  this.path = path;
}

DirectoryCreateErrorProcessor.prototype = Object.create(UnknownProcessor.prototype);

DirectoryCreateErrorProcessor.prototype.Process = function()
{
  switch(this.err.code)
  {
    case "EEXIST":
        utils.warn(this.err.message);
        return new Result(`Directory ${path} already exists.`, error.alreadyExists);
    default:
      utils.warn(this.err.message);
      return this.prototype.Process();
  }
}

const CreateDirectoryAction = function(path, recursive)
{
  AsyncAction.call(this);
  this.path = path;
  this.recursive = recursive;
}

CreateDirectoryAction.prototype = Object.create(AsyncAction.prototype);

CreateDirectoryAction.prototype.Execute = function(resolve, reject)
{
  fs.mkdir(this.path, { recursive: this.recursive }, (err) => {
    var freProcessor = new ErrorProcessor(err, new DirectoryCreateErrorProcessor(this.path));
    var res = new ResultProcessor(freProcessor, new SuccessProcessor(`Directory ${this.path} created.`)).Process();
    return new ErrorController(resolve, reject).Control(res);
  });
};

module.exports = CreateDirectoryAction;