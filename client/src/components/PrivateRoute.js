import React from "react";
import {Redirect, Route} from "react-router-dom";

import {AuthenticationContext} from "../utils/authentication";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export class PrivateRoute extends React.Component {
 
    render(){
        let auth = this.context;
        let isLoggedIn = auth.isAuthenticated();
        console.log(auth);    
        return (<Route {...this.props}>
            {
                isLoggedIn
                ? (this.props.children)
                : (<Redirect to="/login"/>)
            }
        </Route>)
    }
}
PrivateRoute.contextType = AuthenticationContext;

// function PrivateRoute({ children, ...rest }) {
//   return (
//     <Route
//       {...rest}
//       render={({ location }) =>
//         false ? (
//           children
//         ) : (
//           <Redirect            
//             to="/login"
//         />
//         )
//       }
//     />
//   );
// }
