function Document(id, title, chapters) {
    this.id = id;
    this.title = title;
    this.chapters = chapters;
}

var chapterStitcher = function(chapters)
{
    return chapters.join(' ');
}

Document.prototype.toString = function()
{
	return chapterStitcher(this.chapters);
}

module.exports = Document;