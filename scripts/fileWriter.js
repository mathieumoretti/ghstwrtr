const fs = require('fs');

var fileWriter = (function ()
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

  return {
      write: write,
  };
})();

module.exports = fileWriter;