import React from 'react';
import axios from 'axios';

export const fakeAuth = {
    isAuthenticated(){      
      return axios.get('/loggedin').then(function (response) {
        console.log("isloggedin");
        return response.data.error == "false";
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return false;
      });
    } ,
    authenticate(email, password) {
      return axios.post('/login', {
        email: email,
        password: password
      })
      .then(function (response) {
        // handle success
        console.log("isloggedin");
        console.log(response.data);
        return response.data.error == "false";
      })
      .catch(function (error) {
        // handle error
        console.log(error);
        return false;
      });
    },
    signout(cb) {
      setTimeout(cb, 100);
    }
  };

  
export const AuthenticationContext = React.createContext(
    null
);
