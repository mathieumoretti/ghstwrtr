const error = require('./error');
const Result = require('./result');

function SuccessfulResult(content)
{
    Result.call(this, content, error.none);
}

SuccessfulResult.prototype = Object.create(Result.prototype);
module.exports = SuccessfulResult;