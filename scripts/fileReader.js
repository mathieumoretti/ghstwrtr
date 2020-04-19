const promiseMaker = require('./promiseMaker');
const FileReadAction = require('./fileReadAction');

var fileReader = (function ()
{
  function read(filename, callback = null)
  {
      return promiseMaker.make((resolve, reject) => {        
        new FileReadAction(filename).Execute(resolve, reject);
      });
  };

  return {
      read: read,
  };
})();

module.exports = fileReader;