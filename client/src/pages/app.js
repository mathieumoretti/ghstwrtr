// icons
let icons = require('webpack-icons-installer');   //load ALL icons  //load only bootstrap glyphicons

// css files
import 'bootstrap/dist/css/bootstrap.min.css';
//React
import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, useLocation, useParams} from "react-router-dom";

import { AdjectiveMarket } from "../components/AdjectiveMarket"
import  AppMenuBar  from "../components/AppMenuBar"
import  Banner  from "../components/Banner"

import { ErrorBoundary } from "../components/ErrorBoundary"
import { LoginForm } from "../components/Login"
import { PrivateRoute } from "../components/PrivateRoute"
import { Store } from "../components/Store"
import { StoryBoard } from "../components/StoryBoard"
import { Stories } from "../components/Stories"
import Workbench from "../components/Workbench"
import {Auth, AuthenticationContext} from "../utils/authentication";

import Container from '@material-ui/core/Container';

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

function StoryRoute()
{
  let { storyId } = useParams();
  console.log(`storyId:${storyId}`);
  return(<div>
    <StoryBoard id={storyId} />
    <div className="card">
        <div className="card-body">
          <Workbench/>
        </div>
      </div>
  </div>);
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
        <Container maxWidth='xl'>
         
        <AuthenticationContext.Provider value={auth}>
        <Router>
            <div>
              <Switch>
                <PrivateRoute path="/store">
                    <AppMenuBar />
                    <Store />
                </PrivateRoute>
                <PrivateRoute path="/story/:storyId">
                    <AppMenuBar />
                    <StoryRoute></StoryRoute>
                </PrivateRoute>
                <PrivateRoute path="/workbench">
                    <AppMenuBar />
                    <Workbench/>
                </PrivateRoute>
                <PrivateRoute path="/adjective">
                    <AppMenuBar />
                    <AdjectiveMarket />
                </PrivateRoute>
                < PrivateRoute path="/" exact>
                    <AppMenuBar />
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
        </Container>
      </ErrorBoundary>
    );
  }
}
ReactDOM.render(<App />, document.querySelector("app"));
