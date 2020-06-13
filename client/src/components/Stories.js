import React, { Component } from 'react';


export class Headline extends React.Component {
    render() {
      return (<div className="card text-center">
      <div className="card-header">
        Featured
      </div>
      <div className="card-body">
        <h5 className="card-title">Special title treatment</h5>
        <p className="card-text">With supporting text below as a natural lead-in to additional content.</p>
        <a href="#" className="btn btn-primary">Go somewhere</a>
      </div>
      <div className="card-footer text-muted">
        2 days ago
      </div>
    </div>
      );
    }
  }

export class Stories extends React.Component {
        render() {
          return (<div className="card-columns">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title that wraps to a new line</h5>
              <p className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
            </div>
          </div>
          <div className="card p-3">
            <blockquote className="blockquote mb-0 card-body">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </div>
          <div className="card">
            <img className="card-img-top" src="..." alt="Card image cap"></img>
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
              <p className="card-text"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
          <div className="card bg-primary text-white text-center p-3">
            <blockquote className="blockquote mb-0">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat.</p>
              <footer className="blockquote-footer">
                <small>
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </div>
          <div className="card text-center">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This card has supporting text below as a natural lead-in to additional content.</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
          <div className="card">
            <img className="card-img" src="..." alt="Card image"></img>
          </div>
          <div className="card p-3 text-right">
            <blockquote className="blockquote mb-0">
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer posuere erat a ante.</p>
              <footer className="blockquote-footer">
                <small className="text-muted">
                  Someone famous in <cite title="Source Title">Source Title</cite>
                </small>
              </footer>
            </blockquote>
          </div>
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Card title</h5>
              <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This card has even longer content than the first to show that equal height action.</p>
              <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
          );
        }
      }

