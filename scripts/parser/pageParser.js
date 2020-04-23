const Parser = require('./parser');

const PageParser = function(rawPage)
{
    Parser.call(this);
    this.rawPage = rawPage;
}

PageParser.prototype = Object.create(Parser.prototype);

module.exports = PageParser;