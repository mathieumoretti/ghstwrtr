const utils = require('../scripts/utils');

const Processor = require('../scripts/processor');

const UnknownResult = require('../scripts/unknownResult');

const ErrorProcessor = function(err)
{
  Processor.call(this);
  this.err = err;
}

ErrorProcessor.prototype = Object.create(Processor.prototype);

ErrorProcessor.prototype.Process = function () {    
    // Concatenate args

    if(utils.existy(this.err))
    {                        
        return new UnknownResult();
    }
    return null;
}

module.exports = ErrorProcessor;