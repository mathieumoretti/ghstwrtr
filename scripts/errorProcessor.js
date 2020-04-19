const utils = require('../scripts/utils');

const SafeProcessor = require('./safeProcessor');

const SuccessfulResult = require('../scripts/successfulResult');

const ErrorProcessor = function(err, processor)
{
    SafeProcessor.call(this, processor);
    this.err = err;
}

ErrorProcessor.prototype = Object.create(SafeProcessor.prototype);

ErrorProcessor.prototype.Process = function () {    
    // Concatenate args

    if(utils.existy(this.err))
    {
        var errRes = this.processor.Process();
        return errRes;
    }
    return new SuccessfulResult();
}

module.exports = ErrorProcessor;