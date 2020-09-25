import React from 'react';

import axios from 'axios';

export class Auth
{
  constructor()
  {
    this.status = false;
  }

  isAuthenticated(){
    console.log("isAuthenticated?");
    return axios.get('/loggedin')
      .then((response) => {
        // handle success
        console.log(response);
        if (response.data.error == "false")
        {
            console.log("Is logged in.");
            this.status = true;
            return true;
        }
        return false;
      })
      .catch((error) => {
        // handle error
        console.log(error);
         this.status = false;
        return false;
      });
  }

  authenticate(cb) {
    setTimeout(cb, 100); // fake async
  }

  signout(cb) {
    setTimeout(cb, 100);
  }
}
  
export const AuthenticationContext = React.createContext(
    null
);
