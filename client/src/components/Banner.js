import React, { Component } from 'react';


function formatDate(date) {
    const monthNames = [
      'January', 'February', 'March',
      'April', 'May', 'June', 'July',
      'August', 'September', 'October',
      'November', 'December',
    ];
  
    const day = date.getDate();
    const monthIndex = date.getMonth();
    const year = date.getFullYear();
  
    return `${day}  ${monthNames[monthIndex]} ${year}`;
  }

const theDate = formatDate(new Date());

export default class Banner extends React.Component {
    render() {
      const aDate = theDate;
      return<div>
  <hr/>
  <div className="row">
    <div className="col-sm">
      <div className="head" style={{fontSize: "64px", fontWeight: "200" }}>GHSTWRTR</div>
    </div>
  </div>
  <hr/>
  <div className="row">
    <div className="col-sm">
      <div className="head" style={{fontSize: "32px", fontWeight: "200" }}>{aDate}</div>
    </div>
  </div>
  <hr/>
  </div>
    }
  }