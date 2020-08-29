// icons
let icons = require('webpack-icons-installer');   //load ALL icons  //load only bootstrap glyphicons

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
//React
import React from "react";
import ReactDOM from "react-dom";
import {
  BrowserRouter as Router,
  Redirect, Route, Switch
} from "react-router-dom";
let css = require("../css/newspaper.css");


import { AdjectiveMarket } from "../components/AdjectiveMarket"
import  Banner  from "../components/Banner"
import { Menu } from "../components/Menu"
import { Store } from "../components/Store"
import { Stories } from "../components/Stories"
import { LoginForm } from "../components/Login"

const fakeAuth = {
  isAuthenticated: false,
  authenticate(cb) {
    fakeAuth.isAuthenticated = true;
    setTimeout(cb, 100); // fake async
  },
  signout(cb) {
    fakeAuth.isAuthenticated = false;
    setTimeout(cb, 100);
  }
};

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
            to="/login"
        />
        )
      }
    />
  );
}

class App extends React.Component {
  render(){
    return (
      <ErrorBoundary>
        <Router>
            <div>
              <Switch>
                <PrivateRoute path="/store">
                    <Menu />
                    <Banner />
                    <Store />
                </PrivateRoute>
                <PrivateRoute path="/adjective">
                    <Menu />
                    <Banner />
                    <AdjectiveMarket />
                </PrivateRoute>
                < PrivateRoute path="/" exact>
                    <Menu />
                    <Banner />
                    <Stories />
                </PrivateRoute>
                <Route path="/login"  render={() =>
                    <div>
                      <Banner />
                      <LoginForm></LoginForm>   
                    </div>                
                }/> 
              </Switch>
            </div>
        </Router>  
      </ErrorBoundary>
    );
  }
}


class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez aussi enregistrer l'erreur au sein d'un service de rapport.
    //logErrorToMyService(error, errorInfo);
    console.log(error);
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez afficher n'importe quelle UI de repli.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

ReactDOM.render(<App />, document.querySelector("app"));
