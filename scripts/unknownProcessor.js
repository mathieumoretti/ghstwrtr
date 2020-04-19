const utils = require('./utils');

const Processor = require('./processor');
const SafeProcessor = require('./safeProcessor');
const UnknownResult = require('./unknownResult');


const UnknownProcessor = function()
{
  SafeProcessor.call(this, this);
}

UnknownProcessor.prototype = Object.create(Processor.prototype);

UnknownProcessor.prototype.Process = function () {    
    // Concatenate args                      
    return new UnknownResult();
}

module.exports = UnknownProcessor;