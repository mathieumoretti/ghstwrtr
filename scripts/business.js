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

Sentence.prototype.toString = function() {
    return '<Sentence (' + this.rank + ') ' + this.content.substring(0,10) + ' >';
}

const book =
{ 
    title:"",
    author:"",
    sentences: []
}

var firstSentence = new Sentence();
var secondSentence = new Sentence(2);

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
            
