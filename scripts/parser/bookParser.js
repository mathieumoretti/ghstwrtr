const utils = require('../utils');
const Parser = require('./parser');
const Document = require('../models/document');

const BookParser = function(rawBook)
{
    Parser.call(this);
    this.rawBook = rawBook;
}

BookParser.prototype = Object.create(Parser.prototype);

BookParser.prototype.Parse = function()
{
    utils.warn(`Implement Parse method.`);
    return new Document("No id","No title.");
}

module.exports = BookParser;