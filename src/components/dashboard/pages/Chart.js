import React from 'react'
import ReactApexChart from 'react-apexcharts';
import ApexCharts from 'apexcharts';


const Chart = () => {
    const options = {
        chart: {
          type: 'area',
          stacked: false,
        },
        stroke: {
            curve: 'smooth'
          },
          series: [{
            name: 'series1',
            data: [31, 40, 28, 51, 42, 109, 100]
          }, {
            name: 'series2',
            data: [11, 32, 45, 32, 34, 52, 41]
          }],
        xaxis: {
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        },
      };
  return (
    <div>
     <ReactApexChart
      options={options}
      series={options.series}
      type="area"
      height={350}
    />
    </div>
  )
}

export default Chart