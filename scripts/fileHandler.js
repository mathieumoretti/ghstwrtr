const fileWriter = require('./fileWriter');
const fileReader = require('./reader/fileReader');
const promiseMaker = require('./promiseMaker');

const CreateDirectoryAction = require('./action/createDirectoryAction');

 var fileHandler = (function () {

    function write(filename, data)
    {
        return fileWriter.write(filename, data);
    }

    function mkdir(path, recursive)
    {
        return fs.promises.mkdir(path, { recursive: recursive });
    }

    function mkdir2(path, recursive)
    {
        return promiseMaker.make((resolve, reject) => {        
            new CreateDirectoryAction(path, recursive).Execute(resolve, reject);
          });
    }

    function read(filename)
    {
        return fileReader.read(filename);
    }

  return {
      write: write,
      mkdir: mkdir,
      mkdir2: mkdir2,
      read: read,
  };
})();

module.exports = fileHandler;