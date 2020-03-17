var _ = require("underscore");

function Page(number, lines) {
	this.number = number;
	this.lines = lines;
}

var lineStitcher = function(obj)
{
    return obj.join(' ');
}

Page.prototype.toString = function()
{
	return /*stitcher(*/this.lines/*)*/;
}
module.exports = Page;