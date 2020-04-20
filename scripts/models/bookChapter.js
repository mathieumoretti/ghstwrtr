
var _ = require("underscore");
const Chapter = require('./chapter');

function BookChapter(id, pages) {
	Chapter.call(this, id);
	this.pages = pages;
}

BookChapter.prototype = Object.create(Chapter.prototype);

BookChapter.prototype.toString = function()
{
	return this.pages.join("\n");
}

module.exports = BookChapter;