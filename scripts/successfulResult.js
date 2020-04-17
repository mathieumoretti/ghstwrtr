const error = require('./error');
const Result = require('./result');

function SuccessfulResult(content)
{
    Result.call(this, content, error.none);
}

module.exports = SuccessfulResult;