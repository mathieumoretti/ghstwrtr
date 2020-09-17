import React from "react";
import {Redirect, Route} from "react-router-dom";

import {AuthenticationContext} from "../utils/authentication";

// A wrapper for <Route> that redirects to the login
// screen if you're not yet authenticated.
export class PrivateRoute extends React.Component {
    constructor(props) {
        super(props);
    
        this.state = {
            isLoggedIn: false,
            isLoading: true,
        };
    };

    componentDidMount() {
        let auth = this.context;
        auth.isAuthenticated()
            .then((isLoggedIn) =>
            {
                this.setState({isLoggedIn: isLoggedIn, isLoading:false})
            });
      };
      componentWillUnmount(){
          console.log("Private Route unmounting.");
      }
    render() {
        console.log("Private route");
        console.log(this.state.isLoggedIn);
        return (this.state.loading
            ? <div>loading...</div>
            :<Route {...this.props}>{
                this.state.isLoggedIn
                ? (this.props.children)
                : (<Redirect to="/login"/>)
            }
            </Route>);
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
