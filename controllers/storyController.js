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


const fs = require('fs');
const express = require('express');
var router = express.Router();

let content = [];
let stories = [];

function generateContent() {
  const fileContent = fs.readFileSync('data.txt', 'utf8');
  return fileContent.split('.');
}

content = generateContent();

function random() {
  const d = new Date();
  const n = d.getTime();
  return Math.random() * n;
}

function randomCell(arr) {
  return arr[Math.floor(random() * arr.length) % arr.length];
}

function makeContent(noOfSentences) {
  const sentences = [];
  for (let i = 0; i < noOfSentences; i += 1) { // filter verses
    sentences[i] = randomCell(content);
    sentences[i] = `${sentences[i]}.`;
    sentences[i] = sentences[i].replace(/[\d+:\d+]/g, '');
  }
  return sentences;
}

function makeHeadline() {
  return 'Lorem Ipsum';
}

const adjective = ['Flying', 'Cool', 'Funny'];

function makeAuthors() {
  return `${randomCell(adjective)} Ghost ${Math.floor((100 * random()) % 100)}`;
}

let storyCounter = 0;

function makeStory(noOfSentences) {
  const story = {
    id: storyCounter += 1,
    headline: makeHeadline(),
    authors: makeAuthors(),
    content: makeContent(noOfSentences),
  };

  return story;
}

function makeStories(noOfstories) {
  for (let i = 0; i < noOfstories; i += 1) {
    stories[i] = makeStory(10);
  }
  return stories;
}

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

stories = makeStories(10);

module.exports = (req, res) => {
  const newspaper = {
      // main story
      mainStory: stories[0],
      secondaryStories: stories.slice(1, stories.length - 1), // list of stories
  };
  res.json(newspaper);
};
