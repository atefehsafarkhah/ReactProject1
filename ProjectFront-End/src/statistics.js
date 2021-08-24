import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import './statistics.css';



class Statistics extends React.Component {
  
    render() {
      return (
        <Container id="statisticsContainer">
           <Container id='statVis1'>Vis1</Container>
           <Container id='statVis2'>Vis2</Container>
        </Container>
      );
    }
  }

  export default Statistics;