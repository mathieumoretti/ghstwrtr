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
    create : "CREATE TABLE",
    insert : "INSERT INTO",
    update : "UPDATE",
    del : "DELETE FROM",
    drop : "DROP",
    select : "SELECT"
};

// CRUD
function queryMaker(action){

    function create(table, vars) {
        var queryFct = function(table, vars)
        {
            var queryString = `${actions.create} ${table}(${vars.join(',')})`;
            return queryString;
        }
        return queryFct(table, vars);
    }   
    function insert(table, columnIds, columnValues) {
        var queryFct = function(table, columnIds, columnValues)
        {
            var queryString = `${actions.insert} ${table}(${columnIds.join(',')}) VALUES ${columnValues}`;
            return queryString;
        }
        return queryFct(table, columnIds, columnValues);
    }   
    function update() {
        var queryFct = function(table, columns)
        {
            var queryString = `${actions.update} ${columns.join(',')} FROM ${table}`;
            return queryString;
        }
        return queryFct(table, columns);
    }
    function del(table) {
        var queryFct = function(table)
        {
            var queryString = `${actions.del} ${table}`;
            return queryString;
        }
        return queryFct(table);
    }

    function select(table, columns) {
        var queryFct = function(table, columns)
        {
            var queryString = `${actions.select} ${columns.join(',')} FROM ${table}`;
            return queryString;
        }
        return queryFct(table, columns);
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

var columns = ['col1','col2'];
var values = ['val1','val2'];
var table = "table";
var vars = ['var1','var2'];

var createQuery = queryMaker(actions.create);
var insertQuery = queryMaker(actions.insert);
var deleteQuery = queryMaker(actions.del);
var updateQuery = queryMaker(actions.update);
var selectQuery = queryMaker(actions.select);

console.log(createQuery(table, vars));
console.log(insertQuery(table, columns, values, vars));
console.log(deleteQuery(table, vars)); // Plus where
console.log(updateQuery(table, vars));
console.log(selectQuery(table, columns, vars));

//console.log(baz());

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