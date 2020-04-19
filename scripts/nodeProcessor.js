const utils = require('./utils');
const Node = require('./pNode');

const SafeProcessor = require('./safeProcessor');

const NodeProcessor = function(processor, node)
{
    SafeProcessor.call(this, processor);
    this.node = node;
}

NodeProcessor.prototype = Object.create(SafeProcessor.prototype);

NodeProcessor.prototype.Process = function()
{
    return this.processor.Process();
}

module.exports = NodeProcessor;