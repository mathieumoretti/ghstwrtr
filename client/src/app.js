
// css files
import 'bootstrap/dist/css/bootstrap.min.css';
let css = require("./css/newspaper.css");

//React
import React from "react";
import ReactDOM from "react-dom";

import Banner from "./components/Banner";
//import {Game} from "./components/Game";
import Menu from "./components/Menu";
import { Headline, Stories } from "./components/Stories";

let locals = {
  users: [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5"
  ]
};

let story = {
  headline: "user1 is blah",
  content: "Blah blah blah",
};

let secondaryStory = {
  headline: "user2 is boom",
  content: "Boom boom boom",
};

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

let stories = {
  title: "Ghstwrtr",
  date: theDate,
  mainStory: story,
  // list of stories
  secondaryStories: [secondaryStory],
}

ReactDOM.render(<Menu/>, document.querySelector("menu"));
ReactDOM.render(<Banner />, document.querySelector("banner"));
ReactDOM.render(<Headline />, document.querySelector("headline"));
ReactDOM.render(<Stories />, document.querySelector("stories"));
