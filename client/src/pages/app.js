//React
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch, useLocation, useParams} from "react-router-dom";

import { AdjectiveMarket } from "../components/AdjectiveMarket"
import  AppMenuBar  from "../components/AppMenuBar"
import  {CountdownTimer} from "../components/CountdownTimer"
import { ErrorBoundary } from "../components/ErrorBoundary"
import { LoginForm } from "../components/Login"
import { PrivateRoute } from "../components/PrivateRoute"
import { Store } from "../components/Store"
import { StoryBoard } from "../components/StoryBoard"
import { Stories } from "../components/Stories"
import Workbench from "../components/Workbench"
import {Auth, AuthenticationContext} from "../utils/authentication";

import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';

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
    <Grid
  container
  direction="column"
  justify="flex-start"
  alignItems="center"
>
      <Grid item xs={4}>
        <CountdownTimer duration='30000'/> 
      </Grid>
      <Grid item xs={4}>
        <StoryBoard id={storyId} /> 
      </Grid>
      <Grid item xs={4}>
        <Workbench/>
      </Grid>
    </Grid>

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
