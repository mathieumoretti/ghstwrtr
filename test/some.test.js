const test = require('tape');

console.log("bro");

var fs = require('fs');
 
var content = [];

// Figure out how to deal with asynchonocity of the readFile function
// Future // Promise?

function generateContent()
{
    var sentences;

    fs.readFile('data.txt', 'utf8', function(err, contents) {
        if(err)
        {
            console.log(err);
        }
        else
        {
            var sentences = contents.split(".");
            console.log(sentences);
        }
    });

    return sentences;
}

content = generateContent();

console.log(content);

test('responds to requests', (t) => {
  t.plan(0);
  t.end();
});
