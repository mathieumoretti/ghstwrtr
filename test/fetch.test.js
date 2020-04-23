const requester = require('../scripts/requester')
const utils = require('../scripts/utils');
const test = require('tape');


test('fetch data with status OK', (t) => {
    //t.plan(0);

    const baseUrl = "https://www.gutenberg.org/cache/epub";
    const firstBookId = 10900;
    const books = 5;
    for (let i = firstBookId; i < firstBookId + books ; i++) {    
      const adr = `${baseUrl}/${i}/pg${i}.txt`;
      requester.request(adr).then(
        function(response){
          t.equal(response.statusCode, 200)
        }).catch(function (err) {
          utils.fail(err);
      });
    }
    t.end();
  });