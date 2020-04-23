
var _ = require("underscore");
const Chapter = require('./chapter');

function EpubChapter(id, content) {
	Chapter.call(this, id);
	this.content = content;
}

EpubChapter.prototype = Object.create(Chapter.prototype);

EpubChapter.prototype.toString = function()
{
}

module.exports = EpubChapter;