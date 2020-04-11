
const error = require('./error');

function Result(content, err)
{
    this.content = content || "No content.";
    this.error = err || error.none;
}

module.exports = Result;