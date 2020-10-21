import React, { Component } from 'react';


import CountdownTimer from "./CountdownTimer";

import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import EuroIcon from '@material-ui/icons/Euro';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import TimerIcon from '@material-ui/icons/Timer';

const style = {
    width: 300,
    margin: 5,
    textAlign: "center",
    display: "inline-block",
    boxShadow:
      "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)",
  };


export class Adjective extends React.Component {

    constructor(props) {
        super(props);
        this.buy = this.buy.bind(this);
        this.state = {
            isBought : false,
          };
    }

    buy() {
        this.setState({ isBought: true })
    }

    render() {        
      return (
            <Paper style={style} zDepth={1}>
                <Card variant="outlined" >
                    <CardHeader>                   
                    </CardHeader>
                    <CardContent style={{overflow: "hidden" }} >
                        <Grid container alignItems="center" spacing={3}> 
                            <Grid item xs={12}>
                                <Typography variant='h6'>{this.props.adjective}</Typography>
                            </Grid>                                             
                            <Grid item xs={4}>
                                <FavoriteBorderIcon />
                                <Typography>100</Typography>
                            </Grid>
                            <Grid item xs={4}>                            
                                <EuroIcon />
                                <Typography>9</Typography>                          
                            </Grid>
                            <Grid item xs={4}>                            
                                <TimerIcon />
                                <Typography>
                                    <CountdownTimer />
                                </Typography> 
                            </Grid>
                            <Grid item xs={12}>
                                <Button onClick={this.buy} color="primary">
                                    {this.state.isBought ? "Bought!": "Buy"}
                                </Button> 
                            </Grid>   
                        </Grid>                    
                    </CardContent>
                </Card> 
            </Paper>
        );
    }
}