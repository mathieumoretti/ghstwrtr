function Document(id, title) {
    this.id = id;
    this.title = title;
}

// var chapterStitcher = function(chapters)
// {
//     return chapters.join(' ');
// }

Document.prototype.toString = function()
{
	return `${this.id}-${this.title}`;
}

module.exports = Document;