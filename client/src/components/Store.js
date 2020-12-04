import React , { useState, useEffect } from 'react';
import Masonry from 'react-masonry-component';
import { ErrorBoundary } from "./ErrorBoundary";
import { Sentence } from "./Sentence";
import { StoreSocket } from "../utils/StoreSocket";
import { useAutoSocket } from "../hooks/useSocket";


const masonryOptions = {
  gutter: 30,
  horizontalOrder: true,
  columnWidth: 20,
};

function StoreDataLoader()
{
  
}

export class Store extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      sentences: null
    };
    this.socket = new StoreSocket();
    this.buy = this.buy.bind(this);
  }

  buy(id){
    let sentences = this.state.sentences.sentences;
    console.log(sentences);
    
    console.log(id);
    if (id > -1) {
       sentences.splice(id, 1);
    }
    console.log(sentences);
    this.setState({ sentences: this.state.sentences })
  }

  componentDidMount() {
    // Simple GET request using fetch
    fetch('api/sentences')
        .then(response => response.json())
        .then(data => {
            this.setState({ sentences: data })
            this.setState({ loading: false })
        })
        .then (()=>{
            console.log(this.socket);
            this.socket.on("createSentence", (sentence) => {
            console.log("sentence created!");
            console.log(sentence);
            this.setState( { sentences: this.state.sentences.push(sentence) });
          });
        })
        .catch(()=>{
        });
  }

  render() {
    var store = this.state.sentences;

    if (this.state.loading){
      return (<div>loading store</div>)
    }
 
    const childElements = store.sentences.map((item,index)=>{
      return (
        <Sentence key={item} id={index} sentence={store.sentences[index]} buy={this.buy}></Sentence>
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
