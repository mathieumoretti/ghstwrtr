const fs = require('fs');

const promiseMaker = require('promiseMaker');

var fileWriter = (function ()
{
  function write(filename, data)
  {
      return promiseMaker.make((resolve, reject) => {        
        fs.writeFile(filename, data, 'utf8', function(err) {
            if (err) reject(err);
            else
            {
                resolve(filename + "file saved.")
            }
        }); 
      });      
  };

  return {
      write: write,
  };
})();

module.exports = fileWriter;