
var Highcharts = require('highcharts');
require('highcharts-exporting')(Highcharts);

function barChartTagOccurance(obj,container)
{
	Highcharts.chart(container,  {
    chart:{
    	backgroundColor: 'rgba(255,255,255,0.5)',
        zoomType:'x'
    },
    navigator:{
        enabled:true,
        adaptToUpdatedData:true
    },
    title: {
        text: obj.titleText
    },
    navigator: {
            enabled: true      
        },
    subtitle: {
        text: 'Sourcs: StackOverflow.com'
    },

    xAxis: {
        categories: obj.XAxis
    },
    yAxis: {
        min: 0,
        title: {
            text: obj.yAxisText
        }
    },
    series: [{
        type: 'column',
        colorByPoint: true,
        data: obj.YAxis,
        showInLegend: false
    }]

});
}

function drawLineCharts(data,container)
{
    Highcharts.chart(container, {
	chart: {
		zoomType: 'x'
	},
    title: {
        text: data.titleText
    },

    subtitle: {
        text: data.sourceText
    },

    yAxis: {
        title: {
            text: data.yAxisText
        }
    },
    legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'middle'
    },

    plotOptions: {
        series: {
            label: {
                connectorAllowed: false
            },
            pointStart: data.startPoint
        }
    },

    series: [{
        name: 'Tags',
        data: data.seriesData
    }],

    responsive: {
        rules: [{
            condition: {
                maxWidth: 500
            },
            chartOptions: {
                legend: {
                    layout: 'horizontal',
                    align: 'center',
                    verticalAlign: 'bottom'
                }
            }
        }]
    }

});
}

function drawPieChart(data,container)
{
    Highcharts.chart(container, {
    chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: 'pie'
    },
    title: {
        text: data.titleText
    },
    tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
    },
    plotOptions: {
        pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
                enabled: true,
                format: '<b>{point.name}</b>: {point.percentage:.1f} %'
            }
        }
    },
    series: [{
        name: 'Tags',
        colorByPoint: true,
        data: data.data
    }]
});
}

module.exports.barChartTagOccurance = barChartTagOccurance;
module.exports.drawLineCharts = drawLineCharts;
module.exports.drawPieChart = drawPieChart;
