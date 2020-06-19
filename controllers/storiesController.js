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

// comment: idea
// noun: #monster
// verb: #write
// adj: #superb
// adv:
// slang: #YOLO

const express = require('express');
var router = express.Router();

var content = require('../model/model');

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
console.log(theDate);

module.exports = (req, res) => {
  const newspaper = {
    model:
    {
      // main story
      mainStory: content.stories[0],
      // list of stories
      secondaryStories: content.stories.slice(1, content.stories.length - 1),
    },
  };
  res.json(newspaper);
};
