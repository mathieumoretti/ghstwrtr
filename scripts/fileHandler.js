const fs = require('fs');

var fileHandler = (function ()
{
  function write(filename, data)
  {
      return new Promise((resolve, reject) => {        
          fs.writeFile(filename, data, 'utf8', function(err) {
              if (err) reject(err);
              else
              {
                  resolve(filename + "file saved.")
              }
          }); 
      });
  };
  function mkdir(path, recursive)
  {
    return fs.promises.mkdir(path, { recursive: recursive });
  }

  return {
      write: write,
      mkdir: mkdir
  };
})();

module.exports = fileHandler;