const test = require('tape-catch')
const path = require('path')

const testUtils = require('./testUtils');

const utils = require('../scripts/utils');
const EpubParser = require('../scripts/parser/epubParser2');
const reader = require('../scripts/reader/fileReader');

var rootDir = `${utils.rootDir}`;
var inDir = path.join(`${rootDir}`, "tmp", "fetched");
const filename = `pg10900.epub`;
const filepath = `${inDir}/${filename}`;

test("Epub parser parse book .", (t)=>{
    var epubDocPromise = reader.read(filepath);

    epubDocPromise.then((result) =>
    {
        var epubDocument = result.content;
        return new EpubParser(epubDocument).Parse();
    }).then((result) =>
    {
        var epubBook = result;
        console.log(epubBook.chapters[1].pages[0].lines[0]);
        t.equal("1:1 In the beginning God created the heaven and the earth.", epubBook.chapters[1].pages[0].lines[0]);
        testUtils.testCloser(t);
    }).catch((reject) =>
    {          
            console.log(reject);
            testUtils.testCloser(t);
    });
});

test("Epub parser get chapter .", (t)=>{
    var epubDocPromise = reader.read(filepath);
    var chapterIds = null;
    epubDocPromise.then((result) =>
    {
        var epubDocument = result.content;
        chapterIds = epubDocument.GetChapterIds();   
        return epubDocument.GetChapter(chapterIds[1]);
    }).then((result) =>
    {
        var chapter = result.content;
        t.equal(chapterIds[1], chapter.id);
        testUtils.testCloser(t);
    }).catch((reject) =>
        {          
            console.log(reject);
            testUtils.testCloser(t);
     });
});
