import React from 'react'
import { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsynBusinessReport,getAllBusinessReport } from '../../../../redux/transactions/TransactionSlice';

const Monthly = () => {

  const dispatch = useDispatch();
  const businessReport = useSelector(getAllBusinessReport);
console.log("businessReport",businessReport)

  const [filterType, setfilterType] = useState('Weekly');

  const setfilterHandleChange = (event) => {
    setfilterType(event.target.value);
};

  useEffect(() => {
    dispatch(fetchAsynBusinessReport())
  }, [dispatch]);

  const [chartDatamonth, setChartDatamonth] = useState([]);
  const [weeklyData, setweeklyData] = useState([]);
  useEffect(() => {
    // Ensure businessReport exists and has the required data
    if (businessReport && businessReport.monthly_points) {
      // Extract total_points from the new data and create an array
      const chartDatamonthArray = businessReport.monthly_points.map(item => item.total_points);
      setChartDatamonth(chartDatamonthArray);
    }
    if (businessReport && businessReport.weekly_points) {
      // Extract total_points from the new data and create an array
      const weeklyDatachart = businessReport.monthly_points.map(item => item.total_points);
      setweeklyData(weeklyDatachart);
    }
  }, [businessReport]);

  const options = {
    chart: {
      type: 'area',
      stacked: false,
    },
    stroke: {
      curve: 'smooth'
    },
    series: [
      {
        name: 'points',
        data: chartDatamonth,
      },
      
    ],
    xaxis: {
      categories: businessReport && businessReport.monthly_points
        ? businessReport.monthly_points.map(item => moment(item.created_date).format('ddd'))
        : [],

      
    },
  };
  return (
    <div className='' >
      
      <div className=' border'>
        <ReactApexChart
          options={options}
          series={options.series}
          type="area"
          height={350}
        />
      </div>
    </div>
  )
}

export default Monthly