import React, { Component } from 'react';

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
