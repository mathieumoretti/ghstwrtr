"use strict";

const assert = require('assert');


const clone = function(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}

const RankedSentence = function()
{
    this.rank = 0
    this.content = ""
    this.clone = clone,
    this.init = function (){ this.init = 1; this.content = "Default Content."; }
}

RankedSentence.prototype.toString = function() {
    return '<Sentence (' + this.rank + ') ' + this.content.substring(0,10) + ' >';
}

const book =
{ 
    title:"",
    author:"",
    sentences: []
}

var firstSentence = new RankedSentence();
var secondSentence = new RankedSentence(2);

console.log(firstSentence.toString());
firstSentence.init();


var a = 1;
var b = 2;
(function selfCall() {
    var b = 3;
    a += b;
})();

console.log(a); // 4
b; // 2
            
const config = {
    user: 'postgres',
    database: 'ghstwrtr',
    port: 5432
  };

  var executeQuery = function(done, client, queryString, values)
{
    client.query(queryString, values, function(err,result) {
        done(); // closing the connection;
        if(err){
            console.log(err);
        }
    });
}

var actions = 
{
    create : "CREATE",
    insert : "INSERT INTO",
    update : "UPDATE",
    del : "DELETE FROM",
    select : "SELECT"
};

// CRUD
function queryMaker(action){

    function create() {
        return actions.create;
    }   
    function insert() {
        return actions.insert;
    }   
    function update() {
        return actions.update;
    }
    function del() {
        return actions.del;
    }   
    function select() {
        return actions.select;
    }   

    var reaction = null;
    switch(action) {
        case actions.create:
            reaction = create;
          break;
        case actions.insert:
            reaction = insert;
          break;
        case actions.update:
            reaction = update;
          break;
        case actions.del:
            reaction = del;
          break;
        case actions.select:
            reaction = select;
          break;
        default:
            reaction = "bro";
      }
      
    return reaction;
}

console.log(queryMaker(actions.create)());
console.log(queryMaker(actions.insert)());
console.log(queryMaker(actions.del)());
console.log(queryMaker(actions.update)());
console.log(queryMaker(actions.select)());

console.log(baz());

// var queryStr = "INSERT INTO sentence (id, content) VALUES ($1, $2) ";
// var values = [0, sentence.text];
// var queryHandler = function(err, client, done) {
//     if(err){
//         console.log("not able to get connection "+ err);
//     } 

//     var i = 1;
//     executeQuery(done, client, queryStr, values);
// }

// var pool = new pg.Pool(config);
// pool.connect(queryHandler);