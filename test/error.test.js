const test = require('tape');

const utils = require('../scripts/utils');
const error = require('../scripts/error');

test('most basic error codes', (t) => {
    //t.plan(0); 
    t.equal(error.none.code, "OK");
    t.equal(error.some.code, "ERROR");
    t.end();
  });

test('compare error codes', (t) => {
    //t.plan(0);
    var aError = new Error('Whoops!');
    try {
      throw aError;
    } catch (e) {
      console.error(e.name + ': ' + e.code);
    }
    utils.note(aError);

    t.equal(error.none.code, "OK");
    t.equal(error.some.code, "ERROR");
    t.end();
});