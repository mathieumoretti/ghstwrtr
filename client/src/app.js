
// Templates
let userTemplate = require("./views/users.pug");
let storyTemplate = require("./views/story.pug");

// css files
let css = require("./css/newspaper.css");

import React from "react";
import ReactDOM from "react-dom";

const Index = () => {
  return <div>Hello React!</div>;
};

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
  content: "Blah blah blah"  
};

document.querySelector("main").innerHTML = userTemplate(locals);
document.querySelector("main").innerHTML = storyTemplate(story);

ReactDOM.render(<Index />, document.getElementById("index"));