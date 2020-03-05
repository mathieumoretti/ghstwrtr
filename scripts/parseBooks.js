"use strict";
const _ = require('underscore');
var nlp = require('compromise');

const utils = require('./utils');
const reader = require('./fileReader');

const args = require('minimist')(process.argv.slice(2))
_.map(args, (el)=>{console.log(el)});

var inputFilename = "";
if (utils.existy(args[0]))
{
    inputFilename = args["file"] || utils.rootDir + "/data.txt";
}

var orchestrator = 
({
    sentences : [],
    book : book,
});

var newBook = orchestrator.book.content.replace(/(\r\n|\n|\r)/gm," ");

var doc = nlp(newBook);
orchestrator.sentences = doc.sentences().data();

reader.read()

// var pg = require("pg");
 
// const config = {
//   user: 'postgres',
//   database: 'ghstwrtr',
//   port: 5432
// };



// var executeQuery = function(done, client, queryString, values)
// {
//     client.query(queryString, values, function(err,result) {
//         done(); // closing the connection;
//         if(err){
//             console.log(err);
//         }
//     });
// }

// var queryHandler = function(err, client, done) {
//     if(err){
//         console.log("not able to get connection "+ err);
//     } 

//     var i = 1;
//     orchestrator.sentences.forEach(sentence => executeQuery(done, client, "INSERT INTO sentence (id, content) VALUES ($1, $2) ", [i++, sentence.text] )    );
// }


// var createQuery = function(done, client, queryString, values) {}

// var pool = new pg.Pool(config);
// pool.connect(queryHandler);


// pool.connect(function(err, client, done) {
//     if(err){
//         console.log("not able to get connection "+ err);
//     } 

//     var i = 1;
//     orchestrator.sentences.forEach(sentence => {
//         client.query("INSERT INTO sentence (id, content) VALUES ($1, $2) ", [i++, sentence.text] , function(err,result) {
//             done(); // closing the connection;
//             if(err){
//                 console.log(err);
//             }
//         });
//     });    
// });

// Idea for intro's of text 
// Mini-game 
// Randomize 10 sentences, ask user to choose 3.

