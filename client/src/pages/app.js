// icons
let icons = require('webpack-icons-installer');   //load ALL icons  //load only bootstrap glyphicons


// css files
import 'bootstrap/dist/css/bootstrap.min.css';
let css = require("../css/newspaper.css");

//React
import React from "react";
import ReactDOM from "react-dom";

import { Menu } from "../components/Menu";
import Banner from "../components/Banner";
import { Stories } from "../components/Stories";

ReactDOM.render(<Menu />, document.querySelector("menu"));
ReactDOM.render(<Banner />, document.querySelector("banner"));
ReactDOM.render(<Stories />, document.querySelector("stories"));
