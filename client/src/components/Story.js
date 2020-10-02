import React, { Component } from 'react';

export class Story extends React.Component {
    render() {
      return (<div className="card">
          <div className="card-body">
              <h5 className="card-title">{this.props.story.headline}</h5>
              <p className="card-text">{this.props.story.content}</p>
              <div className="card-text text-center">                  
                <p><small > Last updated 3 mins ago </small></p>
                <p>
                    <span><a href="#" className="card-link text-center"> Contribute </a></span>
                    <span><div className="glyphicon glyphicon-chevron-up text-center"></div></span>
                    <span><div className="glyphicon glyphicon-chevron-down text-center"></div></span>
                </p>
             </div>             
          </div>
        </div>
        );
    }
}