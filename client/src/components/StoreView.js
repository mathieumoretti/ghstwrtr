import React from 'react';
import Masonry from 'react-masonry-component';
import { ErrorBoundary } from "./ErrorBoundary";
import { Sentence } from "./Sentence";

const masonryOptions = {
    gutter: 30,
    horizontalOrder: true,
    columnWidth: 20,
  };

export function StoreView({ sentences, children }) {

    const childElements = sentences.map((item,index)=>{
        return (
          <Sentence key={index} id={index} sentence={sentences[index]} ></Sentence>
       );
      });

    return (
        <ErrorBoundary>
        { <div>
            <Masonry          
                className={'my-gallery-class'} // default ''
                options={masonryOptions} // default {}              
            >{
                [...childElements]
            }

            </Masonry>
          </div>
        }</ErrorBoundary>    
      );
}