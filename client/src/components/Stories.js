import React, { Component } from 'react';

import { Story } from "./Story";
import Masonry from 'react-masonry-component';

import { ErrorBoundary } from "./ErrorBoundary";

const masonryOptions = {
  gutter: 30,
  horizontalOrder: true,
  columnWidth: 20,
};

export class Stories extends React.Component {
  constructor(props) {
      super(props);
  
      this.state = {
        loading: true,
          story: null
      };
    }

    componentDidMount() {
      // Simple GET request using fetch
      fetch('api/stories')
          .then(response => response.json())
          .then(data => {
              this.setState({ story: data,
                              loading: false })
          }).catch(()=>{
          });
    }

    render()
    {
      if (this.state.loading){
        return (<div>loading stories...</div>)
      }

      var newspaper = this.state.story;      
      const childElements = newspaper.secondaryStories.map((element)=>{
        console.log(element);
        return (
          <Story key={element.id} className="grid-item" story={element}></Story>
       );
      });

      return (
        <ErrorBoundary>
       {<div>
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
