const utils = require('./utils');

const Processor = require('./processor');
const SafeProcessor = require('./safeProcessor');
const SuccessfulResult = require('../scripts/successfulResult');


const SuccessProcessor = function(data)
{
  SafeProcessor.call(this, this);
  this.data = data;
}

SuccessProcessor.prototype = Object.create(Processor.prototype);

SuccessProcessor.prototype.Process = function () {    
    // Concatenate args                      
    return new SuccessfulResult(this.data);
}

module.exports = SuccessProcessor;