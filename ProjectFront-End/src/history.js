import React from 'react';
import ReactDOM from 'react-dom';
import MyCard from './cards'
import './history.css';
import Container from '@material-ui/core/Container';

class History extends React.Component {
  
    render() {
      return (
        <Container id = "historyContainer" fixed>
           <Container id="cardsContainer">
              <MyCard caption = "Total Recommendations" value = "50" ></MyCard>
              <MyCard caption = "Highly Satisfied Recommendations" value = "30"></MyCard>
              <MyCard caption = "Satisfied Recommendations" value = "10"></MyCard>
              <MyCard caption = "Unsatisfied Recommendations" value = "10"></MyCard>
           </Container>
           <Container id="visConrtainer" maxWidth="sm">
             Visualization
           </Container>
        </Container>
      );
    }
  }

  export default History;