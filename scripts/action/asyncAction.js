const utils = require('../utils');

const AsyncAction = function()
{
}

AsyncAction.prototype.Execute = function(resolve, reject)
{
  utils.fail("Implement Execute method.");
}

module.exports = AsyncAction;