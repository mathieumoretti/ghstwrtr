const AsyncAction = require('./asyncAction');

const FileReadAction = function(filename)
{
  AsyncAction.call(this);
  this.filename = filename;
}

FileReadAction.prototype = Object.create(AsyncAction.prototype);

module.exports = FileReadAction;