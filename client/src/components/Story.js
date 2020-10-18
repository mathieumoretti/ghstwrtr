import React, { Component } from 'react';
import {
    Link
  } from "react-router-dom";

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

const style = {
  width: 300,
  margin: 5,
  textAlign: "center",
  display: "inline-block",
  boxShadow:
    "0 19px 38px rgba(0, 0, 0, 0.30), 0 15px 12px rgba(0, 0, 0, 0.22)",
};

export class Story extends React.Component {
    render() {
      return (<Paper style={style} zDepth={1}>
                <Card variant="outlined" >
                  <CardHeader
                  title={this.props.story.headline}
                  subheader={this.props.story.authors}>
                    <h5 className="card-title">{this.props.story.headline}</h5>
                  </CardHeader>
                  <CardContent style={{overflow: "hidden" }} >
                    <Typography  variant="body1" color="textPrimary" component="p">
                        {this.props.story.content}
                    </Typography>
                  </CardContent>
                  <CardActions disableSpacing>
                    <IconButton component={Link} to={`/story/${this.props.story.id}`} aria-label="add to favorites">
                      <CreateIcon />
                    </IconButton>
                  </CardActions>
                </Card>   
      </Paper>
      
     
      );
    }
}