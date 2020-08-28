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
import { LoginForm } from "../components/Login";
import { Stories } from "../components/Stories";
import { AdjectiveMarket } from "../components/AdjectiveMarket";
import { Store } from "../components/Store";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
function PrivateRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          fakeAuth.isAuthenticated ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }



export default function App() {
    return (
        <Router>
            <div>
            <Menu>
            </Menu>
            <Banner>
            </Banner>
            <Switch>
                <PrivateRoute path="/store">
                    <Store />
                </PrivateRoute>
                <PrivateRoute path="/adjective">
                    <AdjectiveMarket />
                </PrivateRoute>
                <PrivateRoute path="/">
                    <Stories />
                </PrivateRoute>
                <Route path="/login">
                    <LoginForm />
                </Route>
            </Switch>
            </div>
        </Router>  
    );
}


ReactDOM.render(<App />, document.querySelector("stories"));
