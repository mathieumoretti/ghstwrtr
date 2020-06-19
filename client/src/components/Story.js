import React, { Component } from 'react';

export class Story extends React.Component {
    render() {
      return (<div className="card">
          <div className="card-body">
              <h5 className="card-title">{this.props.story.headline}</h5>
              <p className="card-text">{this.props.story.content}</p>
          </div>
        </div>
        );
    }
}