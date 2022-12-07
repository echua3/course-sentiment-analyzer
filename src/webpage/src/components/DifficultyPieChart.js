import React, { Component } from 'react'
import Chart from 'react-apexcharts'
import {difficulty_list} from './CourseSummary'

console.log('In Piechart' + difficulty_list);
class DifficultyPieChart extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        series: difficulty_list,
        options: {
          chart: {
            id: 'apexchart-example',
            type: 'donut',
            animations: {
              enabled: false,
            },
          },
          labels:['Very Easy','Easy','Normal','Hard','Very Hard'],
          dataLabels: {
            enabled: false
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
          stroke: {
              width: 2,
              curve: 'straight'
            },
          legend: {
            position: 'left',
            offsetY: 0,
            height: 130,
            show: true
          },
          title:{
            text: 'Difficulty',
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
      return (
        <Chart options={this.state.options} series={this.state.series} type='donut' width={400} height={220} />
      )
    }
}

export default DifficultyPieChart;