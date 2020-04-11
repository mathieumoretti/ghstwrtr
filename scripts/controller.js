const utils = require('./utils');

const Controller = function(resolve, reject)
{
    this.resolve = resolve;
    this.reject = reject;
}

Controller.prototype.Control = function(result)
{
  utils.fail("Implement Control method.");
}

module.exports = Controller;