var _ = require("underscore");
var Page = require('./page');

function BookPage(number, lines) {
	Page.call(this, number);
	this.lines = lines;
}
BookPage.prototype = Object.create(Page.prototype);

var lineStitcher = function(obj)
{
    return obj.join('\n');
}

BookPage.prototype.toString = function()
{
	return lineStitcher(this.lines);
}
module.exports = BookPage;