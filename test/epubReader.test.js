const test = require('tape-catch')
const path = require('path')

const testUtils = require('./testUtils');

const reader = require('../scripts/reader/fileReader');
const utils = require('../scripts/utils');

var rootDir = `${utils.rootDir}`;
var inDir = path.join(`${rootDir}`, "tmp", "fetched");
const filename = `pg10900.epub`;
const filepath = `${inDir}/${filename}`;

test("Epub reader.", (t) => {
    var epubDocPromise = reader.read(filepath);
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
