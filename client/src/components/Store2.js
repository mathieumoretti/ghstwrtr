import React , { useState, useEffect } from 'react';

import {useFetchWithoutState} from "../hooks/useFetch";
import {StoreView} from "../components/StoreView";
import {AutoSocket} from "../utils/socketClient";
import { Sentence } from "./Sentence";

function existy(x) { return x != null }

function truthy(x) { return ( x !==  false ) && existy(x) }

export function Store2(){
  const [sentences, setSentences] = useState([]);
  
  useFetchWithoutState('api/sentences', (data)=>{
    let someData = data.sentences;
    setSentences(someData.slice(0, 10));
  });

  useEffect(() => {
    const socket = new AutoSocket("");
    socket.on("createSentence", (sentence) => {
      setSentences((oldState) => [...oldState, sentence ]);
    });    
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  const buy = function buy(id){
    let sentences = this.state.sentences.sentences;
    console.log(sentences);
    
    console.log(id);
    if (id > -1) {
       sentences.splice(id, 1);
    }
    console.log(sentences);
    this.setState({ sentences: this.state.sentences })
  }
  // this.buy = this.buy.bind(this);
  if (!truthy(sentences))
  {
    return <h1>Loading</h1>;
  } 
  
  return (<StoreView sentences={ sentences }>
            {
              (sentence, i)=>{
                console.log(i);
                return  (<Sentence key={i}
                                   id={i}
                                   sentence={sentence}
                                  buy={
                                    buy
                                  }></Sentence>);
              }
            }
          </StoreView>
  );
}