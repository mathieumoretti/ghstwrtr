const utils = require('./utils');

const Processor = function()
{
}

Processor.prototype.Process = function(processable, error)
{
    if (utils.existy(error) && utils.existy(processable))
    {
        utils.log(processable);
    }
    utils.fail(`Implement Process method.`);
}

module.exports = Processor;