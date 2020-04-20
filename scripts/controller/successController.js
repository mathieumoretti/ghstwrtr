const utils = require('../utils');
const Controller = require('./controller');

const SuccessController = function(resolve)
{
  Controller.call(this);
  this.resolve = resolve;
}

SuccessController.prototype = Object.create(Controller.prototype);
SuccessController.prototype.Control = function(result){
      this.resolve(result);
}
module.exports = SuccessController;