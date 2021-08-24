import React from 'react';
import ReactDOM from 'react-dom';
import { Checkbox, FormControlLabel, FormGroup, Button } from '@material-ui/core';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Container from '@material-ui/core/Container';
import './profile.css';
class Profile extends React.Component {
  
    render() {
      return (
        <Container id="profileContainer">
           <Container id="editPContainer">
           <FormLabel component="legend">Edit Profile</FormLabel>
           <FormGroup col>
               <TextField id="standard-basic" label="First Name" /> <br></br>
               <TextField id="standard-basic" label="Last Name" /> <br></br>
              <TextField id="standard-basic" label="E-Mail" /> <br></br>
              </FormGroup>
            </Container>
            <Container id="languageInterest">
              <FormControl component="fieldset" >
              <FormLabel component="legend">Languages Interest</FormLabel>
                <FormGroup row>
                <FormControlLabel control = {<Checkbox ></Checkbox>} label = "C++"></FormControlLabel>
                <FormControlLabel control = {<Checkbox ></Checkbox>} label = "Java"></FormControlLabel>
                <FormControlLabel control = {<Checkbox ></Checkbox>} label = "C#"></FormControlLabel>
                <FormControlLabel control = {<Checkbox></Checkbox>} label = "JavaScript"></FormControlLabel>
              
                </FormGroup>
                </FormControl>

              
            </Container>
            <Button variant="contained">Update</Button> 
        </Container>
      );
    }
  }

  export default Profile;