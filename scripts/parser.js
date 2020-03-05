var nlp = require('compromise');

const parser = (function(){
    return {
        parseTxtToSentence : function(text){
            var doc = nlp(text);
            return doc.sentences().data();
        }
    }
})()

module.exports = parser;