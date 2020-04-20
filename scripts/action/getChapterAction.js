const AsyncAction = require('./asyncAction');

const EpubChapter = require('../models/epubChapter');
const ErrorController = require('../controller/defaultController');
const ErrorProcessor = require('../processor/errorProcessor');
const ResultProcessor = require('../processor/resultProcessor');
const SuccessProcessor = require('../processor/successProcessor');
const UnknownProcessor = require('../processor/unknownProcessor');


const EpubChapterProcessor = function(chapterId, content)
{
  SuccessProcessor.call(this, new EpubChapter(chapterId, content));
}
EpubChapterProcessor.prototype = Object.create(SuccessProcessor.prototype);

const GetChapterAction = function(epubDocument, chapterId)
{
  AsyncAction.call(this);
  this.epubDocument = epubDocument;
  this.chapterId = chapterId;
}

GetChapterAction.prototype = Object.create(AsyncAction.prototype);

GetChapterAction.prototype.Execute = function(resolve, reject)
{
  var chapterId = this.chapterId;
    this.epubDocument.getChapter(chapterId, function(err, text){
        var gceProcessor = new ErrorProcessor(err, new UnknownProcessor());        
        var res = new ResultProcessor(gceProcessor, new EpubChapterProcessor(chapterId, text)).Process();
        return new ErrorController(resolve, reject).Control(res);
    });
};

module.exports = GetChapterAction;