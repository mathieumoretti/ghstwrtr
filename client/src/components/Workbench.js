import React, { Component } from 'react';
import nlp from "compromise";

import List from '@material-ui/core/List';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

import TextField from '@material-ui/core/TextField';
import { ErrorBoundary } from "../components/ErrorBoundary"
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/styles';

function ngrams(array, length) {
  var ngramsArray = [];

  for (var i = 0; i < array.length - (length - 1); i++) {
      var subNgramsArray = [];

      for (var j = 0; j < length; j++) {
          subNgramsArray.push(array[i + j])
      }

      ngramsArray.push(subNgramsArray);
  }

  return ngramsArray;
}

function multipleNgrams(array, minLength, maxLength)
{
  var ngramsArray = [];

  if (maxLength < minLength)
    return ngramsArray;

  for (var i = minLength; i < maxLength; i++)
  {
    ngramsArray.push(...ngrams(array, i));
  }

  return ngramsArray;
}


const styles = theme => ({
  root: {
    flexGrow: 1,
    border: 0,
    borderRadius: 3,
  },
  title: {
    flexGrow: 1,
  },
});

class Workbench extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      fragments: null
    };
  }

  componentDidMount() {
    // Simple GET request using fetch
    fetch('/api/sentences')
        .then(response => response.json())
        .then(data => {    
          console.log("sup");
          let doc = nlp(data.sentences.join(' '));
          let sentences = doc.sentences();

          let frag = sentences.list;
          let ngram = multipleNgrams(frag[0].terms(), 5, 9);
          console.log(ngram);

          this.setState({ fragments: ngram })
          this.setState({ loading: false })

        }).catch((e)=>{
          console.log("alice is mad:" + e);
        });
  }
  handleClick(){}
  render() {
    const { classes } = this.props;
    if (this.state.loading)
    {
      return <div>loading Workbench...</div>;
    }

    return (<ErrorBoundary>
      <form className={classes.root} noValidate autoComplete="off">
        <TextField id="outlined-basic" disabled variant="outlined" />
      </form>
      <List className={classes.root} subheader={<li />}>
      <ListSubheader>{`Workbench`}</ListSubheader>
        { this.state.fragments.map( (val,index)=>{             
            return <ListItem key={index} onMouseEnter={
              (x)=>{console.log(x)}
            }>{ 
                val.map((x)=>x.text).join(' ')
              }</ListItem>
        }) }
         
        </List>
      </ErrorBoundary>
    );
  }
}


Workbench.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Workbench)
