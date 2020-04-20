const Document = require('./document');

function EpubBook(id, title, chapters) {
    Document.call(this, id, title);
    this.chapters = chapters;
}

EpubBook.prototype = Object.create(Document.prototype);

EpubBook.prototype.toString = function()
{
	return this.chapters.join("\n");
}

module.exports = EpubBook;