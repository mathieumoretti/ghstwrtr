const utils = require('../utils');

const Processor = require('./processor');

const ResultProcessor = function(errorProcessor, successProcessor)
{
  Processor.call(this);
  this.errorProcessor = errorProcessor;
  this.successProcessor = successProcessor;
}

ResultProcessor.prototype = Object.create(Processor.prototype);

ResultProcessor.prototype.Process = function () {
    var errorRes = this.errorProcessor.Process();
    if (!errorRes.IsSuccessful()){
        return errorRes;
    }
    return this.successProcessor.Process()
}  

module.exports = ResultProcessor;