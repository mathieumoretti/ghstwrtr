import React, { Component } from 'react';
import Masonry from 'react-masonry-component';
import nlp from "compromise";

import { Adjective } from "./Adjective";
import {ErrorBoundary} from "./ErrorBoundary";

const masonryOptions = {
  gutter: 10,
  horizontalOrder: true
};


export class AdjectiveMarket extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      adjectives: null
    };
  }

  componentDidMount() {
    // Simple GET request using fetch
    fetch('api/sentences')
        .then(response => response.json())
        .then(data => {
          console.log(data.sentences);
          let doc = nlp(data.sentences.join(' '));   
          let adj = doc.nouns().adjectives().text().split(' ');
          var set = new Set(adj);
          console.log(set);

          this.setState({ adjectives: adj })
          // console.log("alice:");
          this.setState({ loading: false })
        }).catch((e)=>{
          console.log("alice is mad:" + e);
        });
  }
  handleClick(){}
  render() {
    var store = this.state.adjectives;
    //console.log("bob:");
    return (<ErrorBoundary>
      {this.state.loading
        ? <div>loading adj...</div>
        :<div>
          <Masonry 
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
            options = {masonryOptions}>
                       
          {
                Object.keys(store).map((item,index) => {
                  //console.log(store.sentences[item]);
                  return(
                    <Adjective key={index} adjective={store[item]}></Adjective>
                  );
              })
            }         
          </Masonry>
      </div>

      }</ErrorBoundary>
    );
  }
}
