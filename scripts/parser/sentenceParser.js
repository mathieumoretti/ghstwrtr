var nlp = require('compromise');


const sentenceParser = (function(){
    return {
        parseTxtToSentence : function(text){
            var doc = nlp(text);
            return doc.sentences().data();
        }
    }
})()

module.exports = sentenceParser;