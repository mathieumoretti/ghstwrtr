
// css files
let css = require("./css/newspaper.css");
import 'bootstrap/dist/css/bootstrap.min.css';

//React
import React from "react";
import ReactDOM from "react-dom";



let locals = {
  users: [
    "user1",
    "user2",
    "user3",
    "user4",
    "user5"
  ]
};


let story = {
  headline: "user1 is blah",
  content: "Blah blah blah",
};

let secondaryStory = {
  headline: "user2 is boom",
  content: "Boom boom boom",
};

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

let stories = {
  title: "Ghstwrtr",
  date: theDate,
  mainStory: story,
  // list of stories
  secondaryStories: [secondaryStory],
}

class Banner extends React.Component {
  render() {
    const aDate = theDate;
    return<div>
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

class Square extends React.Component {
  render() {
    return (
      <button className="square">
        {this.props.value}
      </button>
    );
  }
}

class Board extends React.Component {
  renderSquare(i) {
    return <Square value={i} />;
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}


ReactDOM.render(<Banner />, document.querySelector("banner"));
ReactDOM.render(<Game />, document.querySelector("stories"));
