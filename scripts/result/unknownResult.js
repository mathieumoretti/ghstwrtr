const error = require('./error');
const Result = require('./result');

function UnknownResult()
{
    Result.call(this, error.unknown.message, error.unknown);
}

UnknownResult.prototype = Object.create(Result.prototype);

module.exports = UnknownResult;