import React from 'react';
import ReactDOM from 'react-dom';
import Home from './Home';
import Overview from './datasetOverview'
import Dashboard from './dashboard'
import Statistics from './statistics'
import History from './history';
import Profile from './profile';
import Header from './header';
import './Menubar.css';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Container from '@material-ui/core/Container';
import $ from 'jquery';

let statVis = require('./statisticsVis.js');



class SideMenu extends React.Component {
  getHomeClick(){
    document.getElementById('headerText').innerHTML = 'Home';
    ReactDOM.render(<Home/>, document.getElementById('mainDiv-content'));
  }

  getOverviewClick(){
    document.getElementById('headerText').innerHTML = 'Dataset Overview';
    ReactDOM.render(<Overview/>, document.getElementById('mainDiv-content'));
  }
  getDashClick(){
    document.getElementById('headerText').innerHTML = 'Predictor';
    ReactDOM.render(<Dashboard/>, document.getElementById('mainDiv-content'));
  }

  getStatClick(){
    document.getElementById('headerText').innerHTML = 'Statistics';
    ReactDOM.render(<Statistics/>, document.getElementById('mainDiv-content'));

    $.get('http://localhost:5000/DatasetProfiling',function(data,status){
          var jsonObj = JSON.parse(data);
          var barChart = jsonObj.BarChartTagFreq;
          console.log(barChart.XAxis);  

          statVis.barChartTagOccurance(barChart,'statVis1');
          statVis.barChartTagOccurance(barChart,'statVis2');      
        });
  }

  getProjectLinkClick(){
    window.open('https://gitlab.com/EmbeddedAndMore/laproject', 'La Project'); 
  }
  getHisClick(){
    document.getElementById('headerText').innerHTML = 'Dataset Overview';
    ReactDOM.render(<History/>, document.getElementById('mainDiv-content'));
  }

 getProfileClick(){
  
  document.getElementById('headerText').innerHTML = 'DProfile';
  ReactDOM.render(<Profile/>, document.getElementById('mainDiv-content'));
  }

    render() {
      return (
        <Container>
          <Container>
            <h2> TRS </h2>
            <h4> Tag Recommendation System</h4>
          </Container>
            
          <List component="nav"  aria-label="mailbox folders" >

          <ListItem id="Home" button onClick={this.getHomeClick}>
              <ListItemText   primary="Home" />
            </ListItem>
            <ListItem id="datasetOverviewItem" button onClick={this.getOverviewClick}>
              <ListItemText   primary="Dataset overview" />
            </ListItem>
            <ListItem id="predictorItem" button onClick={this.getDashClick}>
              <ListItemText   primary="Predictor"/>
            </ListItem>
            <ListItem id="projectLinkItem" button onClick={this.getProjectLinkClick}>
              <ListItemText   primary="Project Link"/>
            </ListItem>
            <Divider />
            {/*<ListItem id="statisticsItem"  button divider onClick={this.getStatClick} >
              <ListItemText primary="Statistics" />
             </ListItem>
            <ListItem id="historyItem" button onClick={this.getHisClick}>
              <ListItemText primary="History" />
            </ListItem>
            <Divider light />
            <ListItem button onClick={this.getProfileClick}>
              <ListItemText primary="Profile" />
            </ListItem>*/}
            </List>
        </Container>
      );
    }

    
  }
export default SideMenu;
