import React, { Component } from 'react';

export class Sentence extends React.Component {
    render() {
      return (<div className="card">
          <div className="card-body">
              <h5 className="card-title">{this.props.sentence}</h5>
          </div>
        </div>
        );
    }
}