const test = require('tape');
const _ = require('underscore')

const utils = require('../scripts/utils')


// existy
test('should return true or false for various existy scenarios', function (t) {
    t.equal(false, utils.existy(null)); //=> false
    t.equal(false, utils.existy(undefined)); //=> false
    t.equal(false, utils.existy({}.notHere)); //=> false
    t.equal(false, utils.existy((function(){})())); //=> false
    t.equal(true , utils.existy(0)); //=> true
    t.equal(true,  utils.existy(false)); //=> true 
    t.end();
  });

  // truthy
  test('should return true or false for various truthy scenarios', function (t) {
      t.equal(false, utils.truthy(false)); //=> false
      t.equal(false, utils.truthy(undefined)); //=> false
      t.equal(true, utils.truthy(0)); //=> true
      t.equal(true, utils.truthy('')); //=> true 
      t.end();
  });


  // rootDir
  test('should find a root folder with name index.js', function (t) {
      // Add unit tests for truthy
      //t.equal(false, utils.truthy(false)); //=> false
      var rootDir = utils.rootDir;
      utils.note(rootDir);
      t.notEqual(undefined, rootDir)
      t.end();
  });

  // checkers
  test('should return true or false for various truthy scenarios', function (t) {
    
    var aVar = {}.a = 'a';

    function always(VALUE) {
        return function() {
            return VALUE;
        };
    };

    var never = always(false);
    never.message = "It's false buddy";
    var neverPasses = utils.checker(never); 

    t.equal(1, neverPasses().length);
    t.end();
});