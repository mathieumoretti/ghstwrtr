const utils = require('./utils');
const Controller = require('./controller');

const DefaultController = function(resolve, reject)
{
  Controller.call(this, resolve, reject);
}

// More like a Default Controller
DefaultController.prototype = Object.create(Controller.prototype);
DefaultController.prototype.Control = function(result){
  switch(result.error.code)
  {
      case "OK": this.resolve(result);
      case "ERROR": this.reject(result.error);
  }
}
module.exports = DefaultController;