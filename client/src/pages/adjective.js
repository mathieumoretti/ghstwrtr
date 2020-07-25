// icons
let icons = require('webpack-icons-installer');   //load ALL icons  //load only bootstrap glyphicons

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
let css = require("../css/newspaper.css");

//React
import React from "react";
import ReactDOM from "react-dom";

import { Menu } from "../components/Menu";
import { AdjectiveMarket } from "../components/AdjectiveMarket";

ReactDOM.render(<Menu />, document.querySelector("menu"));
ReactDOM.render(<AdjectiveMarket />, document.querySelector("adjective"));
