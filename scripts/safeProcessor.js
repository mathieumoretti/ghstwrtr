const utils = require('./utils');
const Processor = require('./processor');


const SafeProcessor = function(processor)
{
  Processor.call(this);
  this.processor = processor;
}

// More like a Default Controller
SafeProcessor.prototype = Object.create(Processor.prototype);
// return a Result()
SafeProcessor.prototype.Process = function(){
    if (utils.existy(this.processor))
        return this.processor.Process();
    else{
        return this.prototype.Process();
    }
}
module.exports = SafeProcessor;