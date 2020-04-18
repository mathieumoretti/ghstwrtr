const utils = require('./utils');

const Processor = require('./processor');
const ErrorProcessor = require('./errorProcessor');
const SuccessProcessor = require('./successProcessor');

const ResultProcessor = function(err, data)
{
  Processor.call(this);
  this.errorProcessor = new ErrorProcessor(err);
  this.successProcessor = new SuccessProcessor(data);
}

ResultProcessor.prototype = Object.create(Processor.prototype);

ResultProcessor.prototype.Process = function () {
    var errorRes = this.errorProcessor.Process();
    if (utils.existy(errorRes)){
        return errorRes;
    }
    return this.successProcessor.Process()
}  

module.exports = ResultProcessor;