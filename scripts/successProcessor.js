const utils = require('./utils');

const Processor = require('./processor');
const SuccessfulResult = require('../scripts/successfulResult');

const SuccessProcessor = function(data)
{
  Processor.call(this);
  this.data = data;
}

SuccessProcessor.prototype = Object.create(Processor.prototype);

SuccessProcessor.prototype.Process = function () {    
    // Concatenate args                      
    return new SuccessfulResult(this.data);
}

module.exports = SuccessProcessor;