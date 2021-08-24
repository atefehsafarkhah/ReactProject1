import React from 'react';
import ReactDOM from 'react-dom';
import './datasetOverview.css';
import Container from '@material-ui/core/Container';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import { Network, Node, Edge } from 'react-vis-network';
import Graph from 'vis-react';
import $ from 'jquery';
let statVis = require('./statisticsVis.js');

const StyledTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#FF880F',
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles(theme => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
}))(TableRow);

var table1Header =[];
var table1Rows = [];

var table2Header =[];
var table2Rows = [];

function createData() {
  
}


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

var graph = {
  nodes: [
    {id: 1, label: 'javascript' },{id: 2, label: 'c#' },{id: 3, label: 'java' },{id: 4, label: 'python' },{id: 5, label: 'c++' },{id: 6, label: '.net' },{id: 7, label: 'php' },{id: 8, label: 'android' },{id: 9, label: 'jquery' },{id: 10, label: 'html' }
  ],
  edges: [{from: 1, to: 2, value:56, smooth:false},{from: 1, to: 3, value:62, smooth:false},{from: 1, to: 7, value:115, smooth:false},{from: 1, to: 9, value:1505, smooth:false},{from: 1, to: 10, value:799, smooth:false},{from: 2, to: 3, value:75, smooth:false},{from: 2, to: 6, value:2173, smooth:false},{from: 3, to: 8, value:387, smooth:false},{from: 7, to: 9, value:64, smooth:false},{from: 7, to: 10, value:83, smooth:false},{from: 9, to: 10, value:392, smooth:false}]
};

var options = {
  physics: false,
  smooth: false,
  edges: {
    color: '#0000FF',
    arrowStrikethrough: false
  }
};


class Overview extends React.Component {


    componentDidMount(){
      $.get('http://localhost:5000/DatasetProfiling',function(data,status){
          var jsonObj = JSON.parse(data);
  
          table1Header  = jsonObj.DsOverviewTable.Columns;
          table1Rows =    jsonObj.DsOverviewTable.Rows;   

          table2Header = jsonObj.DsCleandOverviewTable.Columns;
          table2Rows = jsonObj.DsCleandOverviewTable.Rows;

          var highFregChart = {
            titleText: 'Trend of Tag Occurance',
            sourceText: 'Stackoverflow.com',
            yAxisText: 'Tag frequency',
            pointStart: 0,
            seriesData: jsonObj.TagFrequencyHighRes, 

          };
          var mediumFregChart = {
            titleText: 'Medium Frequency Tags',
            sourceText: 'Stackoverflow.com',
            yAxisText: 'Tag frequency',
            pointStart: 0,
            seriesData: jsonObj.TagFrequencyMedRes, 

          };
          var lowFregChart = {
            titleText: 'Low Frequency Tags',
            sourceText: 'Stackoverflow.com',
            yAxisText: 'Tag frequency',
            pointStart: 0,
            seriesData: jsonObj.TagFrequencyLowRes, 

          };
          var finalLineChart = {
            titleText: "Tag numbers to question's coverage",
            sourceText: 'Stackoverflow.com',
            yAxisText: 'Percentage (%)',
            pointStart: 0,
            seriesData: jsonObj.TagNumberToQuestionCoverage, 

          };

            var barChart = {
            XAxis: jsonObj.BarChartTagFreq.XAxis,
            YAxis: jsonObj.BarChartTagFreq.YAxis,
            titleText : 'Tag Occurances',
            yAxisText: 'No. of tags'
           }
          statVis.drawLineCharts(highFregChart,'lineChart1');
          //statVis.drawLineCharts(mediumFregChart,'lineChart2');
          //statVis.drawLineCharts(lowFregChart,'lineChart3');
          statVis.barChartTagOccurance(barChart,'barChartContainer');
          statVis.drawLineCharts(finalLineChart,'finalLineChart');
           
        });
    }
    render() {
     // createData();
      return (
        <Container>
        <Container id = "table1Container">
        <Typography variant="h6" id="tableTitle">
          Original Structure Of Data
        </Typography>
        <TableContainer id = "table1Container" component={Paper}>
        <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">{table1Header[0]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[1]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[2]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[3]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[4]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[5]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[6]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[7]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[8]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[9]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[10]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[11]}</StyledTableCell>
            <StyledTableCell align="right">{table1Header[12]}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table1Rows.map(table1Rows => (
            <StyledTableRow key={table1Rows[0]}>
              <StyledTableCell component="th" scope="row">
                {table1Rows[0]}
              </StyledTableCell>
              <StyledTableCell align="right">{table1Rows[1]}</StyledTableCell>
              <StyledTableCell align="right" class="extendedTd">{table1Rows[2]}</StyledTableCell>
              <StyledTableCell align="right" class="extendedTd">{table1Rows[3]}</StyledTableCell>
              <StyledTableCell align="right">{table1Rows[4]}</StyledTableCell>
              <StyledTableCell align="right">{table1Rows[5]}</StyledTableCell>
              <StyledTableCell align="right">{table1Rows[6]}</StyledTableCell>
              <StyledTableCell align="right">{table1Rows[7]}</StyledTableCell>
              <StyledTableCell align="right">{table1Rows[8]}</StyledTableCell>
              <StyledTableCell align="right">{table1Rows[9]}</StyledTableCell>
              <StyledTableCell align="right">{table1Rows[10]}</StyledTableCell>
              <StyledTableCell align="right">{table1Rows[11]}</StyledTableCell>
              <StyledTableCell align="right">{table1Rows[12]}</StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
    </Container>
    <br></br><br></br><br></br>
    <Container id = "table2">
        <Typography variant="h6" id="tableTitle">
          Simplified Structure Of Data
        </Typography>
        <TableContainer component={Paper}>
        <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right">{table2Header[1]}</StyledTableCell>
            <StyledTableCell align="right">{table2Header[2]}</StyledTableCell>
            <StyledTableCell align="right">{table2Header[3]}</StyledTableCell>
            <StyledTableCell align="right">{table2Header[4]}</StyledTableCell>
            <StyledTableCell align="right">{table2Header[5]}</StyledTableCell>
            <StyledTableCell align="right">{table2Header[6]}</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {table1Rows.map(table2Rows => (
            <StyledTableRow key={table2Rows[1]}>
              <StyledTableCell component="th" scope="row">
                {table2Rows[1]}
              </StyledTableCell>
              <StyledTableCell align="right">{table2Rows[2]}</StyledTableCell>
              <StyledTableCell align="right" class="extendedTd">{table2Rows[3]}</StyledTableCell>
              <StyledTableCell align="right">{table2Rows[4]}</StyledTableCell>
              <StyledTableCell align="right">{table2Rows[5]}</StyledTableCell>
              <StyledTableCell align="right">{table2Rows[6]}</StyledTableCell>

            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
      </Container>
        <br></br><br></br><br></br>
        <Container id="lineChartContainer">
        <Container id="lineChart1"></Container>
      </Container>
     <br></br><br></br><br></br>
      <Container id="barChartContainer"></Container>
      <br></br><br></br><br></br>
      <Container id="finalLineChart"></Container>
      <br></br><br></br><br></br>
      <Container id="networkChart">
        <Graph
          graph={graph}
          options={options}
          getNetwork={this.getNetwork}
          getEdges={this.getEdges}
          getNodes={this.getNodes}
          vis={vis => (this.vis = vis)}/>
      </Container>
        </Container>
        );
    }



  }



  export default Overview;