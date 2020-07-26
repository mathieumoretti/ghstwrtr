import React from 'react';
import Masonry from 'react-masonry-component';
import { ErrorBoundary } from "./ErrorBoundary";

const owners =
[{
  name:"RCRL",
  roster:{
    forwards:[],
    defenses:[],
    goalies:[],
  }
},
]

const masonryOptions = {
  gutter: 10,
  horizontalOrder: true
};

export class Player extends React.Component {
  render() {
    return(<p>Player 1</p>);
  }
}

export class Forward extends Player {
  
}
export class Defense extends Player {
  
}
export class Goalie extends Player {
  
}



export class Roster extends React.Component {
  constructor(props) {
    super(props);
    this.maxForwards = 10;
    this.maxDefenses = 4;
    this.maxGoalies = 2;
  }
  render() {
    return(
      <ul>
            <li>
              <Player></Player>
            </li>
          </ul>
    )
  }
}

export class Owner extends React.Component {
  constructor(props) {
    super(props);   
    this.handleClick = this.handleClick.bind(this);
    this.state = {
        owner : props.owner ,
      };
  }

  handleClick(){

    console.log(this.props.owner);
  }

  render() {
    return(
      <div className="card">
        <div className="card-body">        
          <button onClick={this.handleClick}>{this.state.owner.name}</button>
          <Roster></Roster>
        </div>
      </div>)
  }
}



export class Pool extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pool: null
    };
  }

  componentDidMount() {
    this.setState({ loading: false })
  }

  render() {
    var teams = this.state.teams;
    return (<ErrorBoundary>
      {this.state.loading
        ? <div>loading...</div>
        :<div>
          {    console.log(teams)}
          <Masonry 
            className="my-masonry-grid"
            options = {masonryOptions}> 
            <Owner owner={{name:"RCRL"}}  ></Owner>
            <Owner owner={{name:"MT"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>             
            <Owner owner={{name:"RCRL"}} onClick={this.handleClick} ></Owner>
          </Masonry>
      </div>

      }</ErrorBoundary>
    );
  }
}