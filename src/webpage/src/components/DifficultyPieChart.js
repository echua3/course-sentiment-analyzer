import React, { Component } from 'react'
import Chart from 'react-apexcharts'
// import {difficulty_list} from './ChartAnalysis'

class DifficultyPieChart extends Component {
    constructor(props) {
      super(props);
      // if(!difficulty_list){ difficulty_list = null } 
      // console.log('In Piechart2' + difficulty_list);
      this.state = {
        series: this.props.difficulty_list,
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
            text: undefined,
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
          },{
            breakpoint: 768,
            options: {
              chart: {
                height: 250,
                width: 250
              },
              legend: {
                position: 'left',
                offsetY: 0,
                height: 130,
                show: true
              }
            }
          },{
            breakpoint: 992,
            options: {
              chart: {
                height: 384,
                width: 384
              },
              legend: {
                position: 'left',
                offsetY: 0,
                height: 130,
                show: true
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
      console.log('in diff pi chart',this.state.series)
      var temp_sum=0
      for(let index=0; index<this.props.difficulty_list.length; index++)
      {
        temp_sum +=this.props.difficulty_list[index];
      }
      if(temp_sum==0)
      {
        return (
          <h3>No Reviews to Perform Difficulty Analysis</h3>
        )
      }
      else
      {
        return (
          <Chart options={this.state.options} series={this.state.series} type='donut' width={400} height={400} />
        )
      }
     
    }
}

export default DifficultyPieChart;