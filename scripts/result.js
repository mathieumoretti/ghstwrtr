
const error = require('./error');

function Result(content, err)
{
    this.content = content || "No content.";
    this.error = err || error.none;
}

Result.prototype.IsSuccessful = function(){ return this.error == error.none; }

module.exports = Result;