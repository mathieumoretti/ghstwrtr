const promiseMaker = require('./promiseMaker');
const FileWriteAction = require('./action/fileWriteAction');

var fileWriter = (function ()
{ 
  function write(filename, data, encoding)
  {
      return promiseMaker.make((resolve, reject) => {        
        new FileWriteAction(filename, data, encoding).Execute(resolve, reject);
      });
  };

  return {
      write: write,
  };
})();

module.exports = fileWriter;