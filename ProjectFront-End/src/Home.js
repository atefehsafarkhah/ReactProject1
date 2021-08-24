import React from 'react';
import ReactDOM from 'react-dom';
import MyCard from './cards'
import './Home.css';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
const useStyles = makeStyles({
    card: {
      maxWidth: 345,
    },
    media: {
      height: 140,
    },
  });
class Home extends React.Component {
  
    render() {
      return (

        
        <Container id = "HomeContainer" fixed>

        <Container id="TRSConrtainer" maxWidth="sm">
        <h2> Tag Recommendation System </h2>
        
      </Container>

    <Container id="cardsContainer" maxWidth="sm">  
     <Card class="card1" >
     
      <CardActionArea>
        <CardMedia id="aalliImg" class="cardImage"  title="Aalli Mahmood"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Aalli Mahmood         
         </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Front End
          </Typography>
        </CardContent>
      </CardActionArea>    
    </Card>

    <Card class="card2" >
      <CardActionArea>
        <CardMedia id="MohammadImg" class="cardImage"  title="Mohammad  Armoun"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Mohammad Armoun      
         </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Back End
          </Typography>
        </CardContent>
      </CardActionArea>    
    </Card>
    <Card class="card3" >
      <CardActionArea>
        <CardMedia id="MuhammadImg" class="cardImage"  title="Muhammad Dawar"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Muhammad Dawar         
         </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Back End
          </Typography>
        </CardContent>
      </CardActionArea>    
    </Card>
    <Card class="card4" >
      <CardActionArea>
        <CardMedia id="AtefehImg" class="cardImage"  title="Atefeh Safarkhah" />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            Atefeh Safarkhah         
         </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            Front End
          </Typography>
        </CardContent>
      </CardActionArea>    
    </Card>
         </Container>
         <Container id="cardsContainer" maxWidth="sm"> 
    <Card class="card5" >
      <CardActionArea>
        <CardMedia id="chattiImg" class="cardImage"  title="Prof. Dr. Mohamed Amine Chatti.Chati"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Prof. Dr. Mohamed Amine Chatti        
         </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
sth          </Typography> */}
        </CardContent>
      </CardActionArea>    
    </Card>

    <Card class="card6" >
      <CardActionArea>
        <CardMedia id="ArhamImg" class="cardImage"  title="Dr. Arham Muslim"/>
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
          Dr. Arham Muslim
         </Typography>
          {/* <Typography variant="body2" color="textSecondary" component="p">
            Front End
          </Typography> */}
        </CardContent>
      </CardActionArea>    
    </Card>
    </Container>

      </Container>



      )}
  }
  export default Home;