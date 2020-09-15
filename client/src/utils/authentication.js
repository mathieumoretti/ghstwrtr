import React from 'react';

import axios from 'axios';

export const fakeAuth = {
    isAuthenticated(){
        return axios.get('/loggedin')
          .then(function (response) {
            // handle success
            if (response.data.error == false)
            {
                console.log("Is logged in.");
                return true;
            }
          })
          .catch(function (error) {
            // handle error
            console.log(error);
            return false;
          })
          .then(function () {
            // always executed
            setSubmitting(false);
            return false;
          });
    } ,
    authenticate(cb) {
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      setTimeout(cb, 100);
    }
  };

  
export const AuthenticationContext = React.createContext(
    null
);
