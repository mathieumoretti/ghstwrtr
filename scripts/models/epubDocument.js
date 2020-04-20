const Document = require('./document');
const promiseMaker = require('../promiseMaker');
const GetChapterAction = require('./../action/getChapterAction');

function EpubDocument(id, title, epub) {
    Document.call(this, id, title);
    this.epub = epub;
}

EpubDocument.prototype = Object.create(Document.prototype);

EpubDocument.prototype.toString = function()
{
	return this.title;
}

EpubDocument.prototype.GetChapter = function(chapterId)
{
    return promiseMaker.make((resolve, reject) => {        
        new GetChapterAction(this.epub, chapterId).Execute(resolve, reject);
      });
}

EpubDocument.prototype.GetChapterIds = function()
{
    var ids = [];
    this.epub.flow.forEach((chapter) => { ids.push(chapter.id); });
    return ids;
}


module.exports = EpubDocument;