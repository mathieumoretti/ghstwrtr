const Parser = require('./parser');

const ChapterParser = function(rawChapter)
{
    Parser.call(this);
    this.rawChapter = rawChapter;
}

ChapterParser.prototype = Object.create(Parser.prototype);

module.exports = ChapterParser;