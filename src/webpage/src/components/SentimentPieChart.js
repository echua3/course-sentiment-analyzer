import React, { Component } from 'react'
import Chart from 'react-apexcharts'

class SentimentPieChart extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        series: [30, 40, 35],
        options: {
          chart: {
            id: 'apexchart-example',
            type: 'donut'
          },
          labels:['Negative','Neutral','Positive'],
          dataLabels: {
            enabled: false
          },
          responsive: [{
            breakpoint: 780,
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
            height: 230,
            show: true
          }  
        }
      }
    }
    render() {
      return (
        <Chart options={this.state.options} series={this.state.series} type='donut' width={400} height={220} />
      )
    }
}

export default SentimentPieChart;