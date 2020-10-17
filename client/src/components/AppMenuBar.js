import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import Badge from '@material-ui/core/Badge';
import MailIcon from '@material-ui/icons/Mail';
import MoneyIcon from '@material-ui/icons/Money';
import LibraryBooksIcon from '@material-ui/icons/LibraryBooks';
import StoreIcon from '@material-ui/icons/Store';
import CreateIcon from '@material-ui/icons/Create';

import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import {
  Link, Redirect
} from "react-router-dom";
// import axios from 'axios';
// import {AuthenticationContext} from "../utils/authentication";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));


export default function AppMenuBar() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h5" className={classes.title}>
            Ghstwrtr
          </Typography>         
          
          <Badge badgeContent={0}>       
            <IconButton aria-label="create">
              <CreateIcon />
            </IconButton>
          </Badge> 

          <Badge color="secondary" badgeContent={0}>
            <IconButton aria-label="store">
              <MoneyIcon />
            </IconButton>
          </Badge>
          <Badge color="inherit" badgeContent={0}>
            <IconButton aria-label="workbench">
              <LibraryBooksIcon />
            </IconButton>
          </Badge>       
          <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" />
          <Button color="inherit">Sign Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}