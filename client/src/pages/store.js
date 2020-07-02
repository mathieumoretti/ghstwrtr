// css files
import 'bootstrap/dist/css/bootstrap.min.css';
let css = require("../css/newspaper.css");

//React
import React from "react";
import ReactDOM from "react-dom";

import { Menu } from "../components/Menu";
import { Store } from "../components/Store";

ReactDOM.render(<Menu />, document.querySelector("menu"));
ReactDOM.render(<Store />, document.querySelector("store"));
