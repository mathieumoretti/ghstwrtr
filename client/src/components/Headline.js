import React from 'react';

import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CreateIcon from '@material-ui/icons/Create';

export class Headline extends React.Component {
    render() {
      return (<Card variant="outlined">
        <CardHeader
            title={this.props.story.headline}
            subheader="2 days ago">
                Featured
        </CardHeader>
        <CardContent>            
            <Typography variant="body1" color="textPrimary" component="p">
                {this.props.story.content}
            </Typography>        
        </CardContent>
        <CardActions disableSpacing>
          <IconButton aria-label="add to favorites">
            <CreateIcon />
          </IconButton>        
        </CardActions>
      </Card>        
        );
    }
}