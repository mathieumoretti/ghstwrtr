var nlp = require('compromise');

var epubParser = require("./gutembergEpubParser");
var sentenceParser = require("./sentenceParser");

const parser = (function(){
    return {
        parseTxtToSentence : sentenceParser.parseTxtToSentence,
        parseEpubToSentence: epubParser.parseEpubToSentence
    }
})()

module.exports = parser;