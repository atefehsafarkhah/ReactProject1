import React from 'react';
import ReactDOM from 'react-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import './mycards.css';


 

class MyCards extends React.Component {

    render() {
      return (
        <div id = "cards">
        <Card variant="outlined">
        <CardContent>
          <Typography  color="textSecondary" gutterBottom>
           {this.props.caption}
          </Typography>
          <Typography variant="body2" component="p">
            {this.props.value}
            <br />
          </Typography>
        </CardContent>
      </Card>
      </div>
      );
    }
  }

  export default MyCards;