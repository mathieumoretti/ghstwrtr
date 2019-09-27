const utils = require('../utils.js');

// Most important function
// Get bible, shakespeare, coran, and other famous text//
// Parse by sentences
// Substitute names, if possible, at some point
// Choose 3-5 sentences to start a summary.+

// Let's start with this economy
// Percentage of text * rating / normalized + 1%-10% to the site = ownership of a story
// Authors can sell to other their parts, break shares
// Everything is ratable

// Ghost names
// Unlock Qualifiers
// Qualifier Ghost Number

const makeAuthors = function(){
    const adjective = ['Flying', 'Cool', 'Funny'];
    return `${utils.randomCell(adjective)} Ghost ${Math.floor((100 * utils.random()) % 100)}`;
}

const makeHeadline = function() {
    return 'Lorem Ipsum';
}

let content = utils.generateContent();

const makeContent = function (noOfSentences) {
    const sentences = [];
    for (let i = 0; i < noOfSentences; i += 1) { // filter verses
        sentences[i] = utils.randomCell(content);
        sentences[i] = `${sentences[i]}.`;
        sentences[i] = sentences[i].replace(/[\d+:\d+]/g, '');
    }
    return sentences;
} 

var storyCounter = 0;

function makeStory(noOfSentences)
{
    const story = {
        id: storyCounter += 1,
        headline: makeHeadline(),
        authors: makeAuthors(),
        content: makeContent(noOfSentences),
      };
    
      return story;
}

module.exports = makeStory;