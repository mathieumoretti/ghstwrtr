import React , { useState, useEffect } from 'react';

import {useFetchWithoutState} from "../hooks/useFetch";
import StoreView from "../components/StoreView";
import {AutoSocket} from "../utils/socketClient";
import Sentence from "./Sentence";

function existy(x) { return x != null }

function truthy(x) { return ( x !==  false ) && existy(x) }

export function Store2(){
  const [sentences, setSentences] = useState([]);
  
  useFetchWithoutState('api/sentences', (data)=>{
    let someData = data.sentences;
    setSentences(someData.slice(0, 10));
  });

  const onBuy = (id) => {
    console.log("onBuy");
    if (id > -1) {
      sentences.splice(id, 1);
      console.log("remove on buy");
    }else{
      console.log("not found");
      console.log(id);
    }
  }

  useEffect(() => {
    const socket = new AutoSocket("");
    socket.on("createSentence", (sentence) => {
      setSentences((oldState) => [...oldState, sentence ]);
    });    
    // CLEAN UP THE EFFECT
    return () => socket.disconnect();
    //
  }, []);

  if (!truthy(sentences))
  {
    return <h1>Loading</h1>;
  } 
  return (
  <StoreView sentences={ sentences }>
    {      
        (sentence, i) =>
        {
          return(<Sentence key={sentence.id} id={sentence.id} sentence={sentence} buy={onBuy}></Sentence>);
        }
    }      

  </StoreView>

  );
}