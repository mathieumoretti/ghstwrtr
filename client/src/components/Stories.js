import React, { Component } from 'react';

import { Story } from "./Story";
import { Headline } from "./Headline";


// export class StoryCard extends React.Component {
//   render() {
//     return (
//       <div className="card"><div>{this.props.story.headline}</div></div>
//       );
//   }
// }

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
            this.setState({ story: data })
        }).catch(()=>{
        });
  }

  render() {
    var newspaper = this.state.story;
    return (<ErrorBoundary>
      {this.state.loading
        ? <div>loading...</div>
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

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    // Mettez à jour l'état, de façon à montrer l'UI de repli au prochain rendu.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    // Vous pouvez aussi enregistrer l'erreur au sein d'un service de rapport.
    //logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Vous pouvez afficher n'importe quelle UI de repli.
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
