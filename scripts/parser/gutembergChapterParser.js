var _ = require('underscore');
var HTMLParser = require('node-html-parser');

const utils = require('../utils');
const ChapterParser = require('./chapterParser');
const PageParser = require('./pageParser');
const BookChapter = require('../models/bookChapter');
const BookPage = require('../models/bookPage');
const EpubPage = require('../models/epubPage');

PageParser.prototype.Parse = function()
{
    return new BookPage(this.rawPage);
}

// function BibleParser(chapterElement)
// {
//     var links = chapterElement.querySelectorAll("a");
//     var realPageLinks = _.filter(links, (x)=> utils.existy(x.id) && x.id.startsWith("N0"));
//     var rawPages = _.map(realPageLinks, (x) => new EpubPage(x.id.slice(2, x.id.length), x.parentNode.parentNode)); // remove N0
//     return rawPages;
// }

function BibleParser(chapterElement)
{
    var newbook = false;
    var pageCounter = 0;
    var rawPages = []
     _.forEach(chapterElement.childNodes,
        (x)=>{
            if(utils.existy(x.firstChild) && utils.existy(x.firstChild.id) && x.firstChild.id.startsWith("book") && x.firstChild.id[4] != 0 )
            {
                newbook = true;
                pageCounter = 1
                utils.note(x);
            }
            else if(utils.existy(x.firstChild) && utils.existy(x.firstChild.id) && x.firstChild.id.startsWith("N0"))
            {
                pageCounter++;
            }
            else if (pageCounter > 0 && utils.existy(x.rawText) )
            {
                rawPages.push(new EpubPage(pageCounter, x));
            }
            newbook = false;
        }
     );
    return rawPages;
}

var parserByiD = {};
parserByiD["10900"] = BibleParser;

// Returns rawPages
var findPageElements = function(id, chapterElement)
{
    if (utils.existy(parserByiD[id]))
    {
        return parserByiD[id](chapterElement);
    }
    else
    {
        utils.warn(
            `Book id ${id} doesn't have a custom parser, and there aren't any default yet.`
        );   
    }

    return [];
}

const GutembergChapterParser = function(rawChapter, bookId)
{
    ChapterParser.call(this, rawChapter);
    this.bookId = bookId;
}

GutembergChapterParser.prototype = Object.create(ChapterParser.prototype);

function ParsePage(rawPage)
{
    var pParser = new PageParser(rawPage);
    return pParser.Parse();
}

GutembergChapterParser.prototype.Parse = function()
{
    var chapterElement = HTMLParser.parse(this.rawChapter.content);
    var rawPages = findPageElements(this.bookId, chapterElement);
    var pages = _.map(rawPages, (p) => ParsePage());
    return new BookChapter(this.rawChapter.id, pages);
}

module.exports = GutembergChapterParser;