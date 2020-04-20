const test = require('tape-catch')
const testUtils = require('./testUtils');

const EpubParser = require('../scripts/parser/epubParser2');
const reader = require('../scripts/reader/fileReader');

//const filename = "C:/Users/mormm/OneDrive/Bureau/Git/ghstwrtr/data/test/fetched/pg10900.epub";
const filename = "C:/Users/mormm/Git/ghstwrtr/data/test/fetched/pg10900.epub";

test("Epub parser parse book .", (t)=>{
    var epubDocPromise = reader.read(filename);

    epubDocPromise.then((result) =>
    {
        var epubDocument = result.content;
        return new EpubParser(epubDocument).Parse();
    }).then((result) =>
    {
        var epubBook = result;
        console.log(epubBook);
        t.pass();
        testUtils.testCloser(t);
    }).catch((reject) =>
    {          
            console.log(reject);
            testUtils.testCloser(t);
    });
});

test("Epub parser get chapter .", (t)=>{
    var epubDocPromise = reader.read(filename);

    epubDocPromise.then((result) =>
    {
        var epubDocument = result.content;
        var chapterIds = epubDocument.GetChapterIds();
        console.log(chapterIds);
        return epubDocument.GetChapter(chapterIds[0]);
        // var parser = new EpubParser(result.content);
        // return parser.ParseChapter();
    }).then((result) =>
    {
        console.log(result);
        t.pass();
        testUtils.testCloser(t);
    }).catch((reject) =>
        {          
            console.log(reject);
            testUtils.testCloser(t);
     });
});

// test("Epub parser to sentences.", (t)=>{
//     var sentencesPromise = parser.parseEpubToSentence(filename);
//     sentencesPromise.then((result) =>
//     {
//         var sentences = result.content;
//         sentences.slice(0,9).forEach(sentence => {
//             console.log(sentence);
//         });
//         t.pass();
//         testUtils.testCloser(t);
//     }).catch(
//         (reject) =>
//         {          
//             console.log(reject);
//             testUtils.testCloser(t);
//      });
// });
