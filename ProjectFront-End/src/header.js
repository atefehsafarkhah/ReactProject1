import React from 'react';
import ReactDOM from 'react-dom';
import Container from '@material-ui/core/Container';
import './header.css'
class Header extends React.Component {
  
    render() {
      return (
        <Container id='headerDiv'>
           <h2 id='headerText'>{this.props.name}</h2>
        </Container>
      );
    }
  }

  export default Header;