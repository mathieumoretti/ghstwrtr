import React, { Component } from 'react';
import Masonry from 'react-masonry-component';

import { Sentence } from "./Sentence";
import {ErrorBoundary} from "./ErrorBoundary";

const masonryOptions = {
  gutter: 30,
  horizontalOrder: true,
  columnWidth: 20,
};

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
            this.setState({ loading: false })
        }).catch(()=>{
        });
  }

  render() {
    var store = this.state.sentences;

    if (this.state.loading){
      return (<div>loading store</div>)
    }
 
    const childElements = store.sentences.map((index,item)=>{
      return (
        <Sentence key={index} sentence={store.sentences[item]}></Sentence>
     );
    });

    return (
      <ErrorBoundary>
      { <div>
          <Masonry          
              className={'my-gallery-class'} // default ''
              options={masonryOptions} // default {}              
          >
              {childElements}
          </Masonry>
        </div>
      }</ErrorBoundary>    
    );
  }
}
