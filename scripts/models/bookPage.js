var _ = require("underscore");
var Page = require('./page');

function BookPage(number, lines) {
	Page.call(number);
	this.lines = lines;
}
BookPage.prototype = Object.create(Page.prototype);

var lineStitcher = function(obj)
{
    return obj.join(' ');
}

BookPage.prototype.toString = function()
{
	return lineStitcher(this.pages);
}
module.exports = BookPage;