const test = require('tape-catch')
const testUtils = require('./testUtils');

const parser = require('../scripts/parser');

const filename = "C:/Users/mormm/Git/ghstwrtr/data/test/fetched/pg10900.epub";

test("Epub parser.", (t)=>{
    var sentencesPromise = parser.parseEpubToSentence(filename);
    sentencesPromise.then((result) =>
    {
        var sentences = result.content;
        sentences.slice(0,9).forEach(sentence => {
            console.log(sentence);
        });
        t.pass();
        testUtils.testCloser(t);
    }).catch(
        (reject) =>
        {          
            console.log(reject);
            testUtils.testCloser(t);
     });
})
