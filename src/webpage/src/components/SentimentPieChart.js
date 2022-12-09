import { CenterFocusStrong } from '@mui/icons-material';
import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import {sentiment_list} from './ChartAnalysis'

class SentimentPieChart extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        series: sentiment_list,
        options: {
          chart: {
            id: 'apexchart-example',
            type: 'donut',
            animations: {
              enabled: false,
            },
          },
          labels:['Negative','Neutral','Positive'],
          dataLabels: {
            enabled: false,
          },
          noData:{
            text: "There's no data",
            align: 'center',
            verticalAlign: 'middle',
            offsetX: 0,
            offsetY: 0
          },
          responsive: [{
            breakpoint: 880,
            options: {
              chart: {
                height: 200,
                width: 200
              },
              legend: {
                show: false
              }
            }
          }],
          legend: {
            position: 'right',
            offsetY: 0,
            height: 130,
            show: true
          },
          title:{
            text: 'Course Sentiment',
            align: 'center',
            margin: 10,
            floating: false,
            style: {
              fontWeight: 'bold',
              fontSize: '14px',
              fontFamily: 'Montserrat-Regular',
            }
          }, 
        } 
      }
    }
    render() {
      var temp_sum=0
        for(let index=0; index<sentiment_list.length; index++)
        {
          temp_sum +=sentiment_list[index];
        }
        if(temp_sum==0)
        {
          return (
            <h3>No Reviews to Perform Sentiment Analysis</h3>
          )
        }
        else
        {
          return (
            <Chart options={this.state.options} series={this.state.series} type='donut' width={400} height={220} />
          )
        }
  }
}

export default SentimentPieChart;