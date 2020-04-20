var nlp = require('compromise');

var epubParser = require("./parser/gutembergEpubParser");
var sentenceParser = require("./parser/sentenceParser");

const parser = (function(){
    return {
        parseTxtToSentence : sentenceParser.parseTxtToSentence,
        parseEpubToSentence: epubParser.parseEpubToSentence
    }
})()

module.exports = parser;