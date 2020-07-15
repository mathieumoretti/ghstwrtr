import React, { Component } from 'react';


import CountdownTimer from "./CountdownTimer";

export class Sentence extends React.Component {
    render() {
      return (<div className="card">
        <div className="card-header">
          </div>
          <div className="card-body">
            <h5 className="card-title">{this.props.sentence}</h5>
            <br></br>
            <table className="table table-light table-sm text-center">
            <tbody>
                <tr>
                    <th scope="col"> 
                        <span className="glyphicon glyphicon-heart"></span>
                        <span className="badge badge-light">100</span>
                    </th>
                    <th scope="col"> 
                        <span className="glyphicon glyphicon-yen"></span>
                        <span className="badge badge-light">9</span>
                    </th>
                    <th scope="col">
                    <span className="glyphicon glyphicon glyphicon-time"></span>
                        <span className="badge badge-light"><CountdownTimer /></span>
                    </th>
                </tr>
                <tr>
                        <td colSpan="3" scope="col">
                        <button className="btn btn-outline-dark btn-block" >Buy</button> 
                        </td>

                    </tr>
            </tbody>
            </table>
          </div>
          <div className="card-footer">
            
          </div>
          
        </div>
        );
    }
}