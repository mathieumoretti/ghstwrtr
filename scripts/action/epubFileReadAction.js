const path = require("path");
const EPub = require("epub");

const utils = require('../utils');
const EpubDocument = require('../models/epubDocument');
const FileReadAction = require('./fileReadAction');
const ErrorController = require('../controller/errorController');
const ErrorProcessor = require('../processor/errorProcessor');
const SuccessController = require('../controller/successController');
const SuccessProcessor = require('../processor/successProcessor');

// To factorize out 
function parseFileNameToId(filePath){
  //skip pg
  var filename = path.parse(filePath).name;
  return filename.slice(2, filename.length);
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

  epub.on("end", 
    function () {
      var epubDoc = new EpubDocument(epub.id, "GutembergBook", epub)
      var res = new SuccessProcessor(epubDoc).Process();
      new SuccessController(resolve).Control(res);
    }, 
    function(err){
      var res = new ErrorProcessor(err).Process();
      new ErrorController(reject).Control(res);
  })

  epub.parse();
};

    // Could be a result processor and result controller.
    // var freProcessor = new ErrorProcessor(err, new FileReadErrorProcessor(filename));
    // var res = new ResultProcessor(freProcessor, new SuccessProcessor(data)).Process();
    // return new ErrorController(resolve, reject).Control(res);

// fs.readFile(this.filename,'utf8', function(err, data) {
//   // Could be a result processor and result controller.
//   var res = new ErrorProcessor(err).Process(this.filename, data);
//   new ErrorController(resolve, reject).Control(res);
// });


// const RawChapter = function(id, text)
// {
//   this.id = id;
//   this.text = text;
// }

// // To factorize out
// function parseFileNameToId(filePath){
//   //skip pg
//   var filename = path.parse(filePath).name;
//   return filename.slice(2, filename.length);
// }

// function internalGetChapterAsync(epub, chapterId)
// {
//     function asyncAction(resolve, reject)
//     {
//         epub.getChapter(chapterId, function(error, text){
//             var res = result.Result();
//             res.content = new RawChapter(chapterId, text);
//             if (chap)
//                 resolve(res);
//             else
//                 reject(error);
//         });
//     }

//     return promiseMaker.make((resolve, reject) => {
//         asyncAction(resolve, reject)
//     });
// }


module.exports = EpubFileReadAction;