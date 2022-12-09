import React, { Component } from 'react'
import Chart from 'react-apexcharts'
// import {sentiment_list} from './ChartAnalysis'

class SentimentPieChart extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        series: this.props.sentiment_list,
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
            breakpoint: 576,
            options: {
              chart: {
                height: 200,
                width: 300
              },
              legend: {
                position: 'right',
                offsetY: 0,
                height: 130,
                show: true
              }
            }
          }, {
            breakpoint: 768,
            options: {
              chart: {
                height: 300,
                width: 240
              },
              legend: {
                position: 'right',
                offsetY: 0,
                height: 130,
                show: true
              }
            }
          },
          {
            breakpoint: 992,
            options: {
              chart: {
                height: 300,
                width: 384
              },
              legend: {
                position: 'right',
                offsetY: 0,
                height: 130,
                show: true
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
      console.log('in sent pi chart',this.state.series)
        for(let index=0; index<this.props.sentiment_list.length; index++)
        {
          temp_sum +=this.props.sentiment_list[index];
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
            <Chart options={this.state.options} series={this.state.series} type='donut' width={"400"} height={"400"} />
          )
        }
  }
}

export default SentimentPieChart;