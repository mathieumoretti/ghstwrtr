// icons
let icons = require('webpack-icons-installer');   //load ALL icons  //load only bootstrap glyphicons

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
let css = require("../css/newspaper.css");

//React
import React from "react";
import ReactDOM from "react-dom";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
  } from "react-router-dom";

import { Menu } from "../components/Menu";
import Banner from "../components/Banner";
import { Stories } from "../components/Stories";
import { AdjectiveMarket } from "../components/AdjectiveMarket";
import { Store } from "../components/Store";

export default function App() {
    return (
        <Router>
            <div>
            <Menu>
            </Menu>
            <Banner>
            </Banner>
            <Switch>
                <Route path="/store">
                    <Store />
                </Route>
                <Route path="/adjective">
                    <AdjectiveMarket />
                </Route>
                <Route path="/">
                    <Stories />
                </Route>
            </Switch>
            </div>
        </Router>  
    );
}


ReactDOM.render(<App />, document.querySelector("stories"));
