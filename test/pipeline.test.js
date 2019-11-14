const requester = require('../scripts/requester');
const writer = require('../scripts/fileWriter')
const utils = require('../scripts/utils');
const test = require('tape');

test('fetch data with status OK + write in a file', (t) => {
    //t.plan(0);

    const baseUrl = "https://www.gutenberg.org/cache/epub";
    const firstBookId = 8;
    const books = 3;
    for (let i = firstBookId; i < firstBookId + books ; i++) {    
      const adr = `${baseUrl}/${i}/pg${i}.txt`;
      requester.request(adr).then(
        function(response){
          return writer.write(`tmp/pg${i}.txt`, response.body);
      }).then(function (msg) {
          utils.note(msg);
        t.pass();
      }).catch(function (err) {
        utils.fail(err);
        t.fail(err);
      });
    }
    t.end();
  });