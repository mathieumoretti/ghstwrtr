"use strict";

const writer = require('./fileWriter');
const requester = require('./requester');
const utils = require('./utils');

var url = require('url');
var path = require('path');
var rootDir = path.dirname(path.join(require.main.filename, ".."));


var orchestrator = 
{
    sentences : [],
}


// request data
const baseUrl = "https://www.gutenberg.org/cache/epub";
const firstBookId = 8;
const books = 1;
for (let i = firstBookId; i < firstBookId + books ; i++) {
    const adr = `${baseUrl}/${i}/pg${i}.txt`
    var someUrl = url.parse(adr, true);
    requester.request(someUrl)
        .then(function(response){
                return writer.write(`${rootDir}/tmp/pg${i}.txt`, response.body);
        }).then(utils.note, utils.fail);
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
