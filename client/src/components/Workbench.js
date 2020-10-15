import React, { Component } from 'react';
import nlp from "compromise";

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

export class Workbench extends React.Component {
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

    if (this.state.loading)
    {
      return <div>loading Workbench...</div>;
    }

    return (<ErrorBoundary>
      {<div className="jumbotron bg-white">          
          <div>{
            <div>
              {
                this.state.fragments.map(
                  (val,index)=>{
                    return <div key={index}>{ 
                        val.map((x)=>x.text).join(' ')
                      }</div>
                  })
              }
            </div>
          }</div>
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
