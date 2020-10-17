import React from 'react';
import {
  Link, Redirect
} from "react-router-dom";

import { withStyles } from '@material-ui/styles';
import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import MoneyIcon from '@material-ui/icons/Money';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import CreateIcon from '@material-ui/icons/Create';

import axios from 'axios';
import {AuthenticationContext} from "../utils/authentication";

import PropTypes from 'prop-types';

const styles = theme => ({
  root: {
    flexGrow: 1,
    background: '#2E3B55',
    border: 0,
    borderRadius: 3,
    color: 'white',
  },
  title: {
    flexGrow: 1,
  },
});

class HigherOrderComponent extends React.Component {

  render(){
    const { classes } = this.props;
    let component = this;
      let auth = this.context;
      console.log(auth.status);

    if (!auth.status) {
      return <Redirect to="/login" />;
    }

    return (<div className={classes.root}>
      <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar>
          <Typography variant="h4" className={classes.title}>
            Ghstwrtr
          </Typography>
          <Badge badgeContent={0}>       
              <IconButton component={Link} to='/'>
              <CreateIcon style={{ color: 'white' }}/>
              </IconButton>
          </Badge> 
  
         <Badge color="secondary" badgeContent={1}>
           <IconButton component={Link} to='/store'>
             <MoneyIcon style={{ color: 'white' }}/>
           </IconButton>
         </Badge>
         <Badge color="inherit" badgeContent={0}>
           <IconButton component={Link} to='/workbench'>
             <LibraryBooksIcon style={{ color: 'white' }}/>
           </IconButton>
         </Badge>       
         <Avatar alt="Admin" src="/favicon.ico" />
         <Button color="inherit" onClick={
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
           }>Sign Out</Button>
        </Toolbar>
      </AppBar>

    </div>      
      );
  }
}

HigherOrderComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

HigherOrderComponent.contextType = AuthenticationContext;

export default withStyles(styles)(HigherOrderComponent)
