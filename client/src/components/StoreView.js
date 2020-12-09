import React from 'react';
import Masonry from 'react-masonry-component';
import { ErrorBoundary } from "./ErrorBoundary";


const masonryOptions = {
    gutter: 30,
    horizontalOrder: true,
    columnWidth: 20,
  };

const StoreView = ({ sentences, children }) => {

    const childElements = sentences.map((item,index)=>{    
        return (children(item, index));
       
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

export default StoreView;