const utils = require('../utils');
const Controller = require('./controller');

const ErrorController = function(reject)
{
  Controller.call(this);
  this.reject = reject;
}

ErrorController.prototype = Object.create(Controller.prototype);
ErrorController.prototype.Control = function(result){
      this.reject(result.error);
}
module.exports = ErrorController;