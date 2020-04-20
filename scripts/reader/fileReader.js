const promiseMaker = require('../promiseMaker');
const FileReadAction = require('../action/txtFileReadAction');
const EpubFileReadAction = require('../action/epubFileReadAction');

var fileReader = (function ()
{
  function read(filename, callback = null)
  {
      return promiseMaker.make((resolve, reject) => {
        
        if (filename.endsWith(".epub"))
        {
          new EpubFileReadAction(filename).Execute(resolve, reject);
        }
        new FileReadAction(filename).Execute(resolve, reject);
      });
  };

  return {
      read: read,
  };
})();

module.exports = fileReader;