// icons
let icons = require('webpack-icons-installer');   //load ALL icons  //load only bootstrap glyphicons

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
//React
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, useLocation} from "react-router-dom";
let css = require("../css/newspaper.css");

import 'bootstrap/dist/js/bootstrap.js'


import { AdjectiveMarket } from "../components/AdjectiveMarket"
import  Banner  from "../components/Banner"
import { Menu } from "../components/Menu"
import { Store } from "../components/Store"
import { Stories } from "../components/Stories"
import { LoginForm } from "../components/Login"
import { PrivateRoute } from "../components/PrivateRoute"
import {Auth, AuthenticationContext} from "../utils/authentication";

let auth = new Auth();

function NoMatch() {
  let location = useLocation();

  return (
    <div>
      <h3>
        No match for <code>{location.pathname}</code>
      </h3>
    </div>
  );
}

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true
    };
  }

  componentDidMount()
  {
    console.log("app is mounted");
    auth.isAuthenticated()
      .then((res)=>{
        console.log("here");
        console.log(res);
        auth.status = res;
        this.setState({
          loading:false,
        });     
      });
  }

  render(){

    console.log("Render app");

    if (this.state.loading)
    {
      return(<div>loading app</div>);
    }

    return (
      <ErrorBoundary>
        <AuthenticationContext.Provider value={auth}>
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
                <Route>
                  <NoMatch />
                </Route>      
              </Switch>
            </div>
        </Router>  
        </AuthenticationContext.Provider>
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
