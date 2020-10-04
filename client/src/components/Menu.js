import React, { Component } from 'react';
import {
  Link, Redirect
} from "react-router-dom";
import axios from 'axios';
import {AuthenticationContext} from "../utils/authentication";

class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}

export class Menu extends Component {

    constructor(props) {
      super(props);
      this.state = {
        isLoggedOut: false
      };
    }

    render() {
      let component = this;
      let auth = this.context;
      console.log(auth.status);

      if (!auth.status) {
        return <Redirect to="/login" />;
      }

      return ( <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <a className="navbar-brand" href="#"><Welcome name="Admin"/></a>
      <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon"></span>
      </button>
    
      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/store">Store</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/adjective">Adjective</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/workbench">Workbench</Link>
          </li>
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              Dropdown
            </a>
            <div className="dropdown-menu" aria-labelledby="navbarDropdown">
              <a className="dropdown-item" href="#">Action</a>
              <a className="dropdown-item" href="#">Another action</a>
              <div className="dropdown-divider"></div>
              <a className="dropdown-item" href="#">Something else here</a>
            </div>
          </li>
          <li className="nav-item">
            <a className="nav-link" href="#" onClick={
              (event) =>
              { 
                console.log("Signing out")        
                axios.get('/logout')
                .then(function (response) {
                  console.log(response);   
                  // handle success
                  if (response.data.error === "false")
                  {
                      console.log(response.data);
                      console.log(component);
                      auth.status = false;
                      component.setState({isLoggedOut:true}); // Trigger re render                          
                  }
                })
                .catch(function (error) {
                  // handle error
                  console.log("herere")
                  console.log(error);
                });                
              }
            }>Log Out</a>
          </li>
          <li className="nav-item">
            <span className="glyphicon glyphicon-piggy-bank text-center"></span>
            <span className="badge badge-dark">9</span>
          </li>
        </ul>
        
      </div>
    </nav>
      );
    }
}
Menu.contextType = AuthenticationContext;
