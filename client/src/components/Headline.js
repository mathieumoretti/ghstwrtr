import React, { Component } from 'react';

export class Headline extends React.Component {
    render() {
      return (<div className="card">
        <div className="card-header">
            Featured
        </div>
        <div className="card-body">
            <h5 className="card-title">{this.props.story.headline}</h5>
            <p className="card-text">{this.props.story.content}</p>
            <a href="#" className="btn btn-primary">Go somewhere</a>
        </div>
        <div className="card-footer text-muted">
            2 days ago
        </div>
    </div>
        );
    }
}