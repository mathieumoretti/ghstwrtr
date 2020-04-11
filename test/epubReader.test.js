const test = require('tape-catch')
const testUtils = require('./testUtils');

const reader = require('../scripts/epubFileReader');

const filename = "C:/Users/mormm/Git/ghstwrtr/data/test/fetched/pg10900.epub";

test("Epub parser.", (t) => {
    var epubDocPromise = reader.read(filename);
    epubDocPromise.then((result) =>
    {
        console.log(result);
        t.pass();
        testUtils.testCloser(t);
    }).catch(
        (reject) =>
        {          
            console.log(reject);
            testUtils.testCloser(t);
     });
})
