import React from 'react';
import ReactDOM from 'react-dom';
import Overview from './datasetOverview'
import Home from './Home'
import Footer from './footer';
import Header from './header';
import Container from '@material-ui/core/Container';
import './maindiv.css';

class MainDiv extends React.Component {
  
    render() {
      return (
        <Container id="mainDivContainer">
        <Header name='Home'></Header>
        <Container id="mainDiv-content">
            
            <Home></Home>
            
        </Container>
        {/*<Footer></Footer>*/}
        </Container>
      );
    } 
  }
 
  export default MainDiv;
