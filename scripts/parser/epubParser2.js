const _ = require('underscore');

const BookParser = require('./bookParser');
const GutembergChapterParser = require('./gutembergChapterParser');
const EpubBook = require('./../models/epubBook');

const EpubParser = function(epubDoc)
{
    BookParser.call(this, epubDoc);
    this.epubDoc = epubDoc;
}

EpubParser.prototype = Object.create(BookParser.prototype);

function ParseChapter(rawChapter, bookId)
{
    var cParser = new GutembergChapterParser(rawChapter, bookId);
    return cParser.Parse();
}

EpubParser.prototype.Parse = function(){
    // Retrieve all chapters
    var allRawChaptersPromise = _.map(this.epubDoc.GetChapterIds(), (x) => this.epubDoc.GetChapter(x));
    var retrievedAllChapters = Promise.all(allRawChaptersPromise);
    retrievedAllChapters.then((rawChapters)=>{
        var chapters = _.map(rawChapters, (c)=> ParseChapter(c.content, this.epubDoc.id));
        return new EpubBook("No id", "No title", chapters);
    });    
}

module.exports = EpubParser;