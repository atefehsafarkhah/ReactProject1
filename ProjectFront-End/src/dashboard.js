import React from 'react';
import ReactDOM from 'react-dom';
import './dashboard.css';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Input from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Chip from '@material-ui/core/Chip';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import Rating from '@material-ui/lab/Rating';
import SentimentVeryDissatisfiedIcon from '@material-ui/icons/SentimentVeryDissatisfied';
import SentimentDissatisfiedIcon from '@material-ui/icons/SentimentDissatisfied';
import SentimentSatisfiedIcon from '@material-ui/icons/SentimentSatisfied';
import SentimentSatisfiedAltIcon from '@material-ui/icons/SentimentSatisfiedAltOutlined';
import SentimentVerySatisfiedIcon from '@material-ui/icons/SentimentVerySatisfied';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';

import $ from 'jquery';
let statVis = require('./statisticsVis.js');

/*
const StyledRating = withStyles({
  iconFilled: {
    color: '#ff6d75',
  },
  iconHover: {
    color: '#ff3d47',
  },
})(Rating);

const customIcons = {
  1: {
    icon: <SentimentVeryDissatisfiedIcon style={{ fontSize: 40 }}/>,
    label: 'Very Dissatisfied',
  },
  2: {
    icon: <SentimentDissatisfiedIcon style={{ fontSize: 40 }} />,
    label: 'Dissatisfied',
  },
  3: {
    icon: <SentimentSatisfiedIcon  style={{ fontSize: 40 }}/>,
    label: 'Neutral',
  },
  4: {
    icon: <SentimentSatisfiedAltIcon style={{ fontSize: 40 }} />,
    label: 'Satisfied',
  },
  5: {
    icon: <SentimentVerySatisfiedIcon style={{ fontSize: 40 }}/>,
    label: 'Very Satisfied',
  },
};

function IconContainer(props) {
  const { value, ...other } = props;
  return <span {...other}>{customIcons[value].icon}</span>;
}

IconContainer.propTypes = {
  value: PropTypes.number.isRequired,
};*/
var defaultQTitle = "What are the correct version numbers for C#?";
var defaultQBody = "<p>What are the correct version numbers for C#? What came out when? Why can't I find any answers about <strong><em>C# 3.5</em></strong>?</p>";
var defaultTag = '';

function normalize(val, max, min) { return (val - min) / (max - min); }

function doPredictions()
{
  console.log('clicked');


      defaultQTitle = document.getElementById('titleInput').value; 
      defaultQBody = document.getElementById('standard-multiline-static').value;


      var dataVar = {
          "tag":defaultTag,
          "title":defaultQTitle,
          "body":defaultQBody
        };
      $.ajax({
        type:'post',
        url:'http://localhost:5000/GetTagPrediction',        
        contentType:'application/json',
        data:JSON.stringify(dataVar),
          
        success:function(res)
        {
           document.getElementById('recommendedTags').style.display = 'block';
          // Getting barCHart here
           var jsonObj  = JSON.parse(res);
           var wholeTags = jsonObj.WholeTags;
           var barChartXAxis = Object.keys(wholeTags);
           var barChartYAxis = [];
           for(var i=0; i<barChartXAxis.length; i++)
           {
            barChartYAxis.push(wholeTags[barChartXAxis[i]]);
           }
           var barChart = {
            XAxis: barChartXAxis,
            YAxis: barChartYAxis,
            titleText : 'Tags',
            yAxisText: 'Tags probability'
           }
           // drawing bar chart here
           statVis.barChartTagOccurance(barChart,'vis1');


           // Getting pieChart data here
           var predictions = jsonObj.Predictions;
           var predictionKeys = Object.keys(predictions);
           var pieChartData = [];

           
           for(var i=0; i<predictionKeys.length; i++)
           {
            var tempObj = {
              name:predictionKeys[i],
              y:predictions[predictionKeys[i]]
            };

            pieChartData.push(tempObj);
           }

           var pieChart = {
            titleText: 'Recommended tags',
            data: pieChartData
           }
           // Draw pie chart here
           statVis.drawPieChart(pieChart,'vis2');
           // appending predicted tabs here
           document.getElementById('chipsBox').innerHTML = '';
           for(var i=0; i<predictionKeys.length; i++)
           {
           const div = document.createElement('div');
           div.className = 'Chip-root';
           div.id = i;
           div.onclick = function(){
              defaultTag = document.getElementById('Chip'+this.id).innerHTML;
              var recomendBtn = document.getElementById('recommendBtn');
              doPredictions();
           };

           const span = document.createElement('span');
           span.className = 'Chip-label';
           span.innerHTML = predictionKeys[i];
           span.id = 'Chip' + i;

           div.appendChild(span);

           document.getElementById('chipsBox').appendChild(div);
         }

              //console.log(chipBox.innerHtml);

           
        }
      });
}

class Dashboard extends React.Component {
  /*
* click functions
*/
    componentDidMount(){
      document.getElementById('recommendedTags').style.display = 'none';
    }
    recommendBtnClicked()
    { 
      defaultTag = '';
      doPredictions();
       /* $.post('http://localhost:5000/GetTagPrediction',
        JSON.stringify(dataVar),function(data,status){
          console.log(data);
        });*/
        /*
        $.post('https://reqres.in/api/users',data,function(data,status){
          console.log(status);
        });*/
    }

    

    render() {

      return (
        <Container id="predictorDiv">
          
          <Container id="questionDiv">
          <h3>Title:</h3> 
          
            <Container id="titleDiv">
            <Input id="titleInput" defaultValue={defaultQTitle} inputProps={{ 'aria-label': 'description' }} />
            </Container>

            <h3>Description:</h3>
            <Container id="bodyDiv">
            <TextField id="standard-multiline-static"  multiline rows="4" defaultValue={defaultQBody}/>
           </Container>
           <Container>
             <Button id="recommendBtn" variant="contained" onClick = {this.recommendBtnClicked} >Recommend Tags</Button>
           </Container>
          </Container>

          <br></br><br></br><br></br>
          <Container id="recommendationResult">
            
             <Container id ="recommendedTags">
              <Typography component="legend">Recommended Tags</Typography>
              <Box id="chipsBox" component="fieldset" mb={3} borderColor="transparent"> 
              </Box>

             </Container>

             <Container id ="vis2">
            </Container>
          
          {/*  <Container id ="recommendationRating">
             <Typography component="legend">Recommendation Rating</Typography>
             <Box component="fieldset" mb={3} borderColor="transparent">              
              <Rating
                name="customized-icons"
                defaultValue={2}
                getLabelText={value => customIcons[value].label}
                IconContainerComponent={IconContainer}/>
        
              </Box>
             </Container>*/}
          </Container> 
          <br></br><br></br>
          <Container id="visualizationDiv"  >
            <Container id ="vis1">
            </Container>

            
          </Container>
   
        </Container>
      );
    }
  }

  export default Dashboard;