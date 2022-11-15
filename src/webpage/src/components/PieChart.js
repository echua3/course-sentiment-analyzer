import React, { Component } from 'react'
import Chart from 'react-apexcharts'

class PieChart extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        options: {
          chart: {
            id: 'apexchart-example',
            type: 'donut'
          },
        },
        // series: [{
        //   name: 'series-1',
        //   data: [30, 40, 35, 50, 49, 60, 70, 91, 125]
        // }]
        series: [30, 40, 35]
      }
    }
    render() {
      return (
        <Chart options={this.state.options} series={this.state.series} type='donut' width={400} height={220} />
      )
    }
}

export default PieChart;