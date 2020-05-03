const _ = require('underscore');
var db = require('../data/models/index');
var promiseMaker = require('../scripts/promiseMaker');


function queryFindAllPromise(resolve, reject)
{
    const sentences = db.Sentence.findAll({
        limit: 100 ,
        attributes: ['content']
    });
    return resolve(sentences);
}
var sentencesPromise = promiseMaker.make(queryFindAllPromise);

function random() {
    const d = new Date();
    const n = d.getTime();
    return Math.random() * n;
  }
  
  function randomCell(arr) {
    return arr[Math.floor(random() * arr.length) % arr.length];
  }

function makeHeadline() {
    return 'Lorem Ipsum';
  }
  
  const adjective = ['Flying', 'Cool', 'Funny'];
  
  function makeAuthors() {
    return `${randomCell(adjective)} Ghost ${Math.floor((100 * random()) % 100)}`;
  }
  
let storyCounter = 0;

function makeContent(sentences, noOfSentences) {
    var storySentences = [];
    for (let i = 0; i < noOfSentences; i += 1) {
        storySentences[i] = randomCell(sentences);
        storySentences[i] = `${storySentences[i]}`;
    }
    return storySentences.join(' ');
}

function makeStory(sentences, noOfSentences) {
    const story = {
      id: storyCounter += 1,
      headline: makeHeadline(),
      authors: makeAuthors(),
      content: makeContent(sentences, noOfSentences),
    };
  
    return story;
  }

const Model = function()
{
    this.sentences = [];
    this.stories = [];
}

Model.prototype.Init = function()
{
    sentencesPromise.then( (result) => {    
        this.sentences = _.map(result, (x) => {
            return x.content;
        });
    }).then ( (result) =>
    {
        this.stories = this.MakeStories(10);
    });

    Model.prototype.MakeStories = function(count)
    {
        let stories = [];
        for (let i = 0; i < count; i += 1) {
          stories[i] = makeStory(this.sentences, 10);
        }
        return stories;
    }    
}


const model = new Model();
model.Init();
module.exports = model;