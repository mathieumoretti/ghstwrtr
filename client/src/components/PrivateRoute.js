import React from "react";
import {Redirect, Route} from "react-router-dom";

import {AuthenticationContext} from "../utils/authentication";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export class PrivateRoute extends React.Component {
 
    render(){
        let isLoggedIn = this.context;
        console.log("render Private route");
        console.log(this.context);
        if (isLoggedIn.status === false)
        {
            return(<Redirect to="/login"/>);
        }

        return (<Route {...this.props}>
        {
            (this.props.children)
        }
        </Route>)
    }
}
PrivateRoute.contextType = AuthenticationContext;
