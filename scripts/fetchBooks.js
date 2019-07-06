"use strict";

const fs = require('fs');
const https = require('https');
var url = require('url');

var path = require('path');
var rootDir = path.dirname(path.join(require.main.filename, ".."));


var orchestrator = 
{
    sentences : [],
}

// Logging
const onResolvedLog = (resolvedValue) => console.log(resolvedValue);
const onResolvedLogLine = (resolvedValue) => onResolvedLog(resolvedValue + '\n');
const onRejectedLog = (error) => console.log(error);

const writePromise = function(filename, data)
{
    return new Promise((resolve, reject) => {
        var fullFileName = path.join(rootDir, filename);
        fs.writeFile(fullFileName, data, 'utf8', function(err) {
            if (err) reject(err);
            else
            {
                resolve(fullFileName + "file saved.")
            }
        }); 
    });
};

const requester = function(aUrl)
{
    https.get(aUrl, (resp) => {
        let data = '';
        let tokens = aUrl.pathname.split('/');
        let filename = tokens[tokens.length - 1];
        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
          data += chunk;
        });
      
        // The whole response has been received. Save to file.
        resp.on('end', () => {
          writePromise("/tmp/" + filename, data).then(onResolvedLog, onRejectedLog)
        });
      
      }).on("error", (err) => {
        console.log("Error: " + err.message);
      });
}

// request data
const baseUrl = "https://www.gutenberg.org/cache/epub";
const firstBookId = 8;
const books = 1000;
for (let i = firstBookId; i < firstBookId + books; i++) {

    const adr = `${baseUrl}/${i}/pg${i}.txt`
    var someUrl = url.parse(adr, true);
    requester(someUrl);
}


//var promise = new Promise(function(resolve, reject) {
    //     resolve(1);
    //   });
      
    // promise.then(function(val) {
    //     console.log(val); // 1
    //     return val + 2; 
    // }).then(function(val) {
    // console.log(val); // 3
    // })


// Same as above, written concisely
// myPromise.then((resolvedValue) => {
//     console.log(resolvedValue);
// }, (error) => {
//     console.log(error);
// });

// const initOptions = {
//     connect(client, dc, useCount) {
//         const cp = client.connectionParameters;
//         console.log('Connected to database:', cp.database);
//     },

//     // global event notification;
//     error(error, e) {
//         if (e.cn) {
//             // A connection-related error;
//             //
//             // Connections are reported back with the password hashed,
//             // for safe errors logging, without exposing passwords.
//             console.log('CN:', e.cn);
//             console.log('EVENT:', error.message || error);
//         }
//     }
// };

// const pgp = require('pg-promise')(initOptions);

// // using an invalid connection string:
// const db = pgp(process.env.DATABASE_URL);

// db.connect()
//     .then(obj => {

//         db.each('SELECT * FROM public.sentence', [], row => {
//             row.code = parseInt(row.code);
//             })
//             .then(data => {
//                 // data = array of events, with 'code' converted into integer
//             })
//             .catch(error => {
//                 // error
//             });
//         obj.done(); // success, release the connection;
//     })
//     .catch(error => {
//         console.log('ERROR:', error.message || error);
//     });
