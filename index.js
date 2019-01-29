// express hello world
const express = require('express');
const console = require('console');
var fs = require('fs');
var _ = require('underscore');
 
const app = express();
const PORT = process.env.PORT || 5000;

// views
app.set('views', './views');
app.set('view engine', 'pug');

//app.use('/static', express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/public'));
// routes
app.get('/', (req, res) => {
  res.render('index', { title: 'ghstwrtr' });
});
app.get('/login', (req, res) => {
  res.render('login', { title: 'ghstwrtr' });
});

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

var content = [];
var stories = [];

function generateContent()
{
    var sentences;
    var fileContent = fs.readFileSync('data.txt', 'utf8');   
    return fileContent.split(".");
}

content = generateContent()

function random()
{
    var d = new Date();
    var n = d.getTime();
    return Math.random() * n;
}

function randomCell(arr)
{
    return arr[Math.floor(random() * arr.length) % arr.length];
}

function makeContent(noOfSentences)
{ 
    var sentences = [];
    for (var i = 0; i < noOfSentences; i++) {        
        sentences[i] = randomCell(content);
    }
    return sentences;
}

function makeHeadline()
{
    return 'Lorem Ipsum';
}

var adjective = ["Flying", "Cool", "Funny"];

function makeAuthors()
{
    return randomCell(adjective) + " Ghost " + Math.floor(100 * random() % 100);
}

var storyCounter = 0;

function makeStory(noOfSentences)
{
    var story = {
        id : storyCounter++,
        headline : makeHeadline(),
        authors : makeAuthors(),
        content : makeContent(noOfSentences)
    };

    return story;
}

function makeStories(noOfstories)
{
    var stories = [];
    for (var i = 0; i < noOfstories; i++) {
        stories[i] = makeStory(10)
    }
    return stories;
}

function formatDate(date) {
  var monthNames = [
    "January", "February", "March",
    "April", "May", "June", "July",
    "August", "September", "October",
    "November", "December"
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + ' ' + monthNames[monthIndex] + ' ' + year;
}

var date = formatDate(new Date());
console.log(date);

var stories = makeStories(10);
var newspaper = 
{ 
    model: 
    { 
        title: 'ghstwrtr',
        date: date,
        // main story
        mainStory: stories[0],
        // list of stories
        secondaryStories: stories.slice(1, stories.length - 1), 
    } 
}

app.get('/stories', (req, res) => {
  res.render('stories', newspaper);
});

app.get('/story/:storyId', (req, res) => {
    var story = (req.params.storyId) ? stories[req.params.storyId] : stories[0]
    res.render('story', story);
});

app.listen(PORT);
console.log('Server started');
