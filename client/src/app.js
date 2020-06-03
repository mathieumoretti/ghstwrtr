let userTemplate = require("./views/users.pug");
let locals = {
  users: [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5"
  ]
};
document.querySelector("main").innerHTML = userTemplate(locals);

let storyTemplate = require("./views/story.pug");
let story = {
  headline: "user1 is blah",
  content: "Blah blah blah"  
};
document.querySelector("main").innerHTML = storyTemplate(story);
