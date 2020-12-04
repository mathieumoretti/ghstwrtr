import React , { useState, useEffect } from 'react';

export function StoreList({ sentences, children }) {

    if (!Array.isArray(sentences))
    {
      return (<h1>None</h1>);
    }
  
    return (
      <section className='main-section'>
        <ul className='todo-list'>{
          
            sentences.map((sentence, i) => (
              <li key={ i }>{ children(sentence) }</li>
            ))
          
        }</ul>
      </section>
    );
  }