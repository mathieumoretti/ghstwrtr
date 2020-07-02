import React, { Component } from 'react';
import { Sentence } from "./Sentence";


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
            console.log("alice:");
            this.setState({ loading: false })
        }).catch(()=>{
          console.log("alice is mad:");
        });
  }

  render() {
    var store = this.state.sentences;
    console.log("bob:");
    return (<ErrorBoundary>
      {this.state.loading
        ? <div>loading...</div>
        :<div>
        <div className="card-columns">
        {
          Object.keys(store.sentences).map((item,index) => {
            console.log(store.sentences[item]);
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
