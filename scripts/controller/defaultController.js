const utils = require('../utils');
const Controller = require('./controller');
const ErrorController = require('./errorController');
const SuccessController = require('./successController');


const DefaultController = function(resolve, reject)
{
  Controller.call(this)
  this.sucController = new SuccessController(resolve);
  this.errController = new ErrorController(reject);
}

// More like a Default Controller
DefaultController.prototype = Object.create(Controller.prototype);
DefaultController.prototype.Control = function(result){
  switch(result.error.code)
  {
      case "OK": this.sucController.Control(result);
      case "ERROR": this.errController.Control(result);
  }
}
module.exports = DefaultController;