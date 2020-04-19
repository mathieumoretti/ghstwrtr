const path = require("path");
const EPub = require("epub");

const utils = require('./utils');
const FileReadAction = require('./fileReadAction');
const ErrorController = require('./defaultController');
const Processor = require('./processor');

const ErrorProcessor = function(err)
{
  Processor.call(this);
  this.err = err;
}

ErrorProcessor.prototype = Object.create(Processor.prototype);

ErrorProcessor.prototype.Process = function (filename, data) {
    // Concatenate args

    if(utils.existy(this.err))
    {
        switch(this.err.code) {
          case "EEXIST":
            utils.warn(this.err.message);
            return new Result(`File ${filename} already exists.`, error.alreadyExists);
          default:
            utils.warn(this.err.message);
            return new UnknownResult();
        }
    }
    return new SuccessfulResult(data);
}

const ResultProcessor = function(err)
{
  Processor.call(this);
}

ResultProcessor.prototype = Object.create(Processor.prototype);

ResultProcessor.prototype.Process = function (filename, data) {

}


const RawChapter = function(id, text)
{
  this.id = id;
  this.text = text;
}

// To factorize out
function parseFileNameToId(filePath){
  //skip pg
  var filename = path.parse(filePath).name;
  return filename.slice(2, filename.length);
}

function internalGetChapterAsync(epub, chapterId)
{
    function asyncAction(resolve, reject)
    {
        epub.getChapter(chapterId, function(error, text){
            var res = result.Result();
            res.content = new RawChapter(chapterId, text);
            if (chap)
                resolve(res);
            else
                reject(error);
        });
    }

    return promiseMaker.make((resolve, reject) => {
        asyncAction(resolve, reject)
    });
}

function enhanceEpubReader(c) {
  return class GutembergEpubReader extends c {
      constructor(filename) {
          //do your magic here
          super(filename);
          this.id = parseFileNameToId(filename);
      }

      getChapterAsync(chapterId)
      {
         var rawChapterPromise = internalGetChapterAsync(this, chapterId);
         return rawChapterPromise;
      }
  }
}
const GutembergEpubReader = enhanceEpubReader(EPub);

const EpubFileReadAction = function(filename)
{
  FileReadAction.call(this, filename);
}

EpubFileReadAction.prototype = Object.create(FileReadAction.prototype);


EpubFileReadAction.prototype.Execute = function(resolve, reject)
{
  var epub = new GutembergEpubReader(this.filename);

  epub.on("end", function () {
      resolve(this.filename);
    }, (err) => reject(err))

  epub.parse();
};

// fs.readFile(this.filename,'utf8', function(err, data) {
//   // Could be a result processor and result controller.
//   var res = new ErrorProcessor(err).Process(this.filename, data);
//   new ErrorController(resolve, reject).Control(res);
// });



module.exports = EpubFileReadAction;