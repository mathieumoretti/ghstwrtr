var _ = require('underscore');
var path = require('path');

var EPub = require("epub");
var HTMLParser = require('node-html-parser');

const Chapter = require('./models/chapter');
const Document = require('./models/document');
const Page = require('./models/page');
const Sentence = require('./models/sentence');

const result = require('./result');
const sentenceParser = require('./sentenceParser');
const utils = require('./utils');
const promiseMaker = require('./promiseMaker');

// Hardcode pageElement parser for the moment by Book ID

var Epub = require("epub");

function parseFileNameToId(filePath){
    //skip pg
    var filename = path.parse(filePath).name;
    return filename.slice(2, filename.length);
}

function internalGetChapterAsync(epub, chapterId)
{
    function asyncAction(resolve, reject)
    {
        epub.getChapter(chapterId, function(error, text){
            var chap = parseChapter(chapterId, text)
            if (chap)
                resolve(chap);
            else
                reject(error);
        });
    }

    return promiseMaker.make((resolve, reject) => {        
        asyncAction(resolve, reject)
    });
}


function enhanceEpubParser(c) {
  return class GutembergEpubParser extends c {
      constructor(filename) {
          //do your magic here
          super(filename);
          this.id = parseFileNameToId(filename);
      }

      getChapterAsync(chapterId)
      {
         return internalGetChapterAsync(this, chapterId);
      }
  }
}
const GutembergEpubParser = enhanceEpubParser(Epub);

var parserByiD = {};
parserByiD["10900"] = function (chapterElement){
    var pageLinks = chapterElement.querySelectorAll(".x-ebookmaker-pageno");
    return _.map(pageLinks, (x)=>{return {pageElement:x.parentNode, id:x.id}});
}

parserByiD["16800"] = function (chapterElement){
    var pageLinks = chapterElement.querySelectorAll(".x-ebookmaker-pageno");
    return _.map(pageLinks, (x)=>{return {pageElement:x.parentNode, id:x.id}});
}

// Returns page elements
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

var parseLines = function(text)
{
    return [];
}

var createPage = function(number, text)
{
    var parsedLines = parseLines(text);
    var aPage = new Page(number, text);
    return aPage;
}

var parsePage = function(number, pageElement){

    var text = pageElement.rawText;
    var page = createPage(number, text);
    return page;
}

var createChapter = function(id, chapterElement)
{
    var pageElements = findPageElements(id, chapterElement);
    var pages = _.filter(_.map(pageElements, (x)=>parsePage(x.id, x.pageElement)),
        (p)=> {
            return p.lines != "";
        });

    return new Chapter(id, pages);
}

var parseChapter = function(chapterId, html)
{
    var chapterElement = HTMLParser.parse(html);
    return createChapter(chapterId, chapterElement);
}

var book = new Document(1, "A book", []);



function parseEpubAsync(filename)
{
    var epub = new GutembergEpubParser(filename);

    function asyncAction(resolve, reject)
    {
        epub.on("end", function () {
            var ids = [];
            epub.flow.forEach((chapter) => { ids.push(chapter.id); });
    
            var allChaptersPromise = _.map(ids, (x) => epub.getChapterAsync(x));
            var retrievedAllChapters = Promise.all(allChaptersPromise);
            retrievedAllChapters.then((chapters)=>{
    
                // filter
                book.chapters =_.filter(chapters,(c)=>{
                    return utils.existy(c);
                });            
    
                var sentences = sentenceParser.parseTxtToSentence(book.toString());
                
                var res = result.Result();
                res.content = _.map(sentences, (x,id) => new Sentence(id + 1, x.text));
                resolve(res);
            }, (err) => reject(err))
        });

       
        epub.parse();        
    }            

    return promiseMaker.make((resolve, reject) => {        
        asyncAction(resolve, reject)
    });
}

const epubParser = (function(){
    return {
        parseEpubToSentence: function(filename)
        {
            return parseEpubAsync(filename);
        }
    }
})()

module.exports = epubParser;
