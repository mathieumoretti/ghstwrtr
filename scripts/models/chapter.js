
var _ = require("underscore");

function Chapter(id, pages) {
	this.id = id;
	this.pages = pages;
}

var pageStitcher = function(pages)
{
    return pages.join(' ');
}

Chapter.prototype.toString = function()
{
	return pageStitcher(this.pages);
}

module.exports = Chapter;