import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Avatar from '@material-ui/core/Avatar';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import { Sentence } from "./Sentence";
import {ErrorBoundary} from "./ErrorBoundary";

export class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
        sentences: null
    };
  }

  componentDidMount() {
    // Simple GET request using fetch
    fetch('api/sentences')
        .then(response => response.json())
        .then(data => {
            this.setState({ sentences: data })
            // console.log("alice:");
            this.setState({ loading: false })
        }).catch(()=>{
          // console.log("alice is mad:");
        });
  }

  render() {
    var store = this.state.sentences;
    //console.log("bob:");
    return (<ErrorBoundary>
      {this.state.loading
        ? <div>loading sto...</div>
        :<div>
        <div className="card-columns">
        {
          Object.keys(store.sentences).map((item,index) => {
            //console.log(store.sentences[item]);
            return(

              <Sentence key={index} sentence={store.sentences[item]}></Sentence>
            )
        })}
        </div>
      </div>
      }</ErrorBoundary>
    );
  }
}
