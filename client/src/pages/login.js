// css files
import 'bootstrap/dist/css/bootstrap.min.css';
let css = require("../css/newspaper.css");

//React
import React from "react";
import ReactDOM from "react-dom";

import Banner from "../components/Banner";
import { LoginForm } from "../components/Login";

ReactDOM.render(<Banner />, document.querySelector("banner"));
ReactDOM.render(<LoginForm />, document.querySelector("login"));
