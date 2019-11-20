const test = require('tape');

const error = require('../scripts/error');

test('most basic error codes', (t) => {
    //t.plan(0); 
    t.equal(error.none.code, "OK");
    t.equal(error.some.code, "ERROR");
    t.end();
  });