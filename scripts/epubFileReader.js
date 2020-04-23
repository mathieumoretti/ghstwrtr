const EPub = require("epub");
const path = require("path");
const error = require('./error');
const result = require('./result');
const promiseMaker = require('./promiseMaker');
const utils = require('./utils');

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

var epubFileReader = (function ()
{
  function read(filename, callback = null)
  {   
      var epub = new GutembergEpubReader(filename);
      function asyncAction(resolve, reject)
      {
      }
      return promiseMaker.make((resolve, reject) => {        
        asyncAction(resolve, reject);
      });      
  };

  return {
      read: read,
  };
})();

module.exports = epubFileReader;


// epub.on("end", function () {
            
//   var someProcessor = function(someError)
//   {
//       // Concatenate args
//       var allChaptersPromise = [];
//       epub.flow.forEach((chapter) => {
//          // ids.push(chapter.id);
//         allChaptersPromise.push(epub.getChapterAsync(chapter.id));

//       });    
//       var retrievedAllChapters = Promise.all(allChaptersPromise);
//       var res = result.Result();
//       rawChapters.content = retrievedAllChapters;
//       if(utils.existy(someError))
//       {
//           switch(someError.code) {
//             case "EEXIST":
//               res.error = error.alreadyExists;
//               res.intCode = someError.number;   
//               res.content = `File ${filename} " already exists.`; // Should never happen
//               utils.warn(someError.message);
//               break;

//             default:
//               res.error = error.unknown;
//               utils.fail(someError.message);
//           }
//       }

//       res.content = data;
//       return res; 
//   }

//   var errorController = function(res)
//   {
//       switch(res.error.code)
//       {
//           case "OK": resolve(res);
//           case "ERROR": reject(res.error);
//       }
//   }

//   var res = someProcessor(err);
//   errorController(res);
// }); 
// }

// return promiseMaker.make((resolve, reject) => {        
// asyncAction(resolve, reject)
// });      