const test = require('tape-catch')
const testUtils = require('./testUtils');

const utils = require('../scripts/utils');
const error = require('../scripts/error');

const ResultProcessor = require('../scripts/resultProcessor');

test("Process a success.", (t)=>{
    var res = new ResultProcessor(null, "somecontent").Process();
    t.equal(error.none.code, res.error.code);
    t.end();
})

test("Process an error.", (t)=>{
    var res = new ResultProcessor({}, "somecontent").Process();
    t.equal(error.unknown.code, res.error.code);
    t.end();
})