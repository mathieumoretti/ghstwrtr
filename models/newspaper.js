const utils = require('./utils.js');
const story_factory = require('../models/factory/storyFactory.js')

function formatDate(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December',
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${day}  ${monthNames[monthIndex]} ${year}`;
  }
  
const theDate = formatDate(new Date());


function makeStories(noOfstories) {
  let stories = [];
  for (let i = 0; i < noOfstories; i += 1) {
    stories[i] = story_factory(10);
  }
  return stories;
}

let stories = makeStories(10);

const Newspaper = function()
{
    const base = {
        title: "",
        mainStory: "",
        secondaryStories: []
    };
    return base;
}

const newspaper = {
    title: 'ghstwrtr',
    date: theDate,
    // main story
    mainStory: stories[0],
    // list of stories
    secondaryStories: stories.slice(1, stories.length - 1),
  };

module.exports = newspaper;