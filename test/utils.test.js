const test = require('tape');

const utils = require('../scripts/utils')

test('should return true of false for various existy scenarios', function (t) {
    t.equal(false, utils.existy(null)); //=> false
    t.equal(false, utils.existy(undefined)); //=> false
    t.equal(false, utils.existy({}.notHere)); //=> false
    t.equal(false, utils.existy((function(){})())); //=> false
    t.equal(true , utils.existy(0)); //=> true
    t.equal(true,  utils.existy(false)); //=> true 
    t.end();
  });

  test('should return true of false for various truthy scenarios', function (t) {
      t.equal(false, utils.truthy(false)); //=> false
      t.equal(false, utils.truthy(undefined)); //=> false
      t.equal(true, utils.truthy(0)); //=> true
      t.equal(true, utils.truthy('')); //=> true 
      t.end();
  });

  test('should find a root folder with name index.js', function (t) {
      // Add unit tests for truthy
      //t.equal(false, utils.truthy(false)); //=> false
      var rootDir = utils.rootDir;
      utils.note(rootDir);
      t.notEqual(undefined, rootDir)
      t.end();
  });