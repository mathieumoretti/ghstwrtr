import React, { Component } from 'react';

import { Story } from "./Story";
import { Headline } from "./Headline";
import { ErrorBoundary } from "./ErrorBoundary";

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

  render() {
    var newspaper = this.state.story;
    return (<ErrorBoundary>
      {this.state.loading
        ? <div>loading stories...</div>
        :<div>
          <Headline story={newspaper.mainStory}></Headline>
          <div className="card-columns">
          {
            Object.keys(newspaper.secondaryStories).map((item,index) => {
              return(
                <Story story={newspaper.secondaryStories[item]}></Story>
              )
          })}
          </div>
        </div>
      }</ErrorBoundary>
    );
  }
}
