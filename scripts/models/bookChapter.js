
var _ = require("underscore");
const Chapter = require('./chapter');

function BookChapter(id, pages) {
	Chapter.call(id);
	this.pages = pages;
}

BookChapter.prototype = Object.create(Chapter.prototype);

BookChapter.prototype.toString = function()
{
}

module.exports = BookChapter;