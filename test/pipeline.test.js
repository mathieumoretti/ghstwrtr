const requester = require('../scripts/requester');
const fileHandler = require('../scripts/fileHandler')
const utils = require('../scripts/utils');
const test = require('tape');


function getCreateDirPromise(path)
{
    return new Promise(fileHandler.mkdir(path)
    .then(function (msg) {
        utils.note(`${msg}`);
    }).catch(function (err) {
        if (err.code == "EEXIST"){
          return err;
        }
    });  
}

function createTmpDir(path)
{
    var tmpDirName = `${path}/tmp/`
    createDir(tmpDirName);
}

const rootDir = utils.rootDir;
const pipelineOptions = 
{
  tmpDir : `${rootDir}`,
}

var what = createTmpDir(pipelineOptions.tmpDir);

test('fetch data with status OK + write in a file', (t) => {
    //t.plan(0);

    const baseUrl = "https://www.gutenberg.org/cache/epub";
    const firstBookId = 8;
    const books = 2; // Case 1 [no folder], Case 2

    


    function SetUpPipeline(options)
    {
      // Might become createTmpDirs
      var promises = [];
      promises.push(new Promise(()=>{createTmpDir(t, options.tmpDir)}));
      return promises;
    }
    
    function debugging(debugMsg)
    {
      utils.note(debugMsg)
    }
    Promise.all(SetUpPipeline(pipelineOptions)).then(debugging, utils.fail)

    // Promise all create dir + request than write files

    // for (let i = firstBookId; i < firstBookId + books ; i++) {
      

      // const adr = `${baseUrl}/${i}/pg${i}.txt`;
      // requester.request(adr).then(
      //   function(response){
      //     return fileHandler.write(`${rootDir}/tmp/pipeline/pg${i}.txt`, response.body);
      // }).then(function (msg) {
      //     utils.note(msg);
      //     t.pass();
      // }).catch(function (err) {        
      //     t.fail(err);
      // });
    //}
    t.end();
  });
