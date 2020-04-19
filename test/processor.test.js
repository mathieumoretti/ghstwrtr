const test = require('tape-catch')
const testUtils = require('./testUtils');

const utils = require('../scripts/utils');
const error = require('../scripts/error');

const UnknownResult = require('../scripts/unknownResult');

const Processor = require('../scripts/processor');
const SafeProcessor = require('../scripts/safeProcessor');
const ErrorProcessor = require('../scripts/errorProcessor');
const NodeProcessor = require('../scripts/nodeProcessor');
const SuccessProcessor = require('../scripts/successProcessor');
const ResultProcessor = require('../scripts/resultProcessor');
const UnknownProcessor = require('../scripts/unknownProcessor');

// Default processor tests
test("Process a success.", (t)=>{
    var res = new SuccessProcessor("SomeString").Process();
    t.equal(error.none.code, res.error.code);
    t.end();
})

test("Process an error.", (t)=>{
    var unkProcessor =  new UnknownProcessor();
    var errProcessor = new ErrorProcessor({}, unkProcessor)
    var res = errProcessor.Process();
    t.equal(error.unknown.code, res.error.code);
    t.end();
})

// ResultProcessor test
test("Process a success.", (t)=>{
    var errProcessor = new ErrorProcessor(null, new UnknownProcessor());
    var sucProcessor = new SuccessProcessor("somecontent");
    var res = new ResultProcessor(errProcessor, sucProcessor).Process();
    t.equal(error.none.code, res.error.code);
    t.end();
})

 test("Process an error.", (t)=>{
    var errProcessor = new ErrorProcessor({}, new UnknownProcessor());
    var sucProcessor = new SuccessProcessor("somecontent");
    var res = new ResultProcessor(errProcessor, sucProcessor).Process();
    t.equal(error.unknown.code, res.error.code);
    t.end();
 });

// // ResultProcessor test
// test("Process a success.", (t)=>{
//     var res = new ResultProcessor(null, "somecontent").Process();
//     t.equal(error.none.code, res.error.code);
//     t.end();
// })

// test("Process an error.", (t)=>{
//     var res = new ResultProcessor({}, "somecontent").Process();
//     t.equal(error.unknown.code, res.error.code);
//     t.end();
// });


// const FileErrorProcessor = function(err, filename)
// {
//   ErrorProcessor.call(this, err);
//   this.filename = filename;
// }

// FileErrorProcessor.prototype = Object.create(ErrorProcessor.prototype);

// FileErrorProcessor.prototype.Process = function ()
// {
//     if(utils.existy(this.err))
//     {                        
//         switch(this.err.code) {
//           case "EEXIST":
//             utils.warn(this.err.message);
//             return new Result(`File ${this.filename} " already exists.`, error.alreadyExists);
//           default:
//             utils.warn(this.err.message);
//             return ErrorProcessor.prototype.Process.call(this);
//         }
//     }
// }

// const FileResultErrorProcessor = function(err, data, filename)
// {
//   ResultProcessor.call(this, err, data);

//   this.filename = filename

//   this.errorProcessor = new FileErrorProcessor(err, filename);
// }

// FileResultErrorProcessor.prototype = Object.create(ResultProcessor.prototype);

// test("Process a success.", (t)=>{
//     var res = new FileResultErrorProcessor(null, "somecontent").Process();

//     t.equal(error.none.code, res.error.code);
//     t.end();
// })

// test("Process an error.", (t)=>{
//     var res = new FileResultErrorProcessor({message:"Unknown error."}, "somecontent").Process();
//     t.equal(error.unknown.code, res.error.code);
//     t.end();
// })