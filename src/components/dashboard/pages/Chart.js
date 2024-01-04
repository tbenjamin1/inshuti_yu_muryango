import React from 'react'
import { useEffect, useState } from 'react';
import ApexCharts from 'apexcharts';
import ReactApexChart from 'react-apexcharts';
import moment from 'moment';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsynBusinessReport, getAllBusinessReport } from '../../../redux/transactions/TransactionSlice';


const Chart = () => {

  const dispatch = useDispatch();
  const businessReport = useSelector(getAllBusinessReport);
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
        name: 'rewards',
        data: chartDatamonth,
      },
       {
        name: 'customers',
        data:weeklyData,
      }
    ],
    xaxis: {
      categories: businessReport && businessReport.monthly_points
        ? businessReport.monthly_points.map(item => moment(item.created_date).format('MMM'))
        : [],
      // categories: businessReport && businessReport.weekly_points
      // ? businessReport.weekly_points.map(item =>  moment(item.created_date).format('ddd'))
      // : [],
    },
  };
  return (
    <div className='' >
      <div className='font-bold border-b-2    py-2 mb-1' >Report <select required value={filterType} onChange={setfilterHandleChange} className='rounded border' >
        <option className='' value='Weekly' >Weekly</option>
        <option value='Monthly' >Monthly</option>
      </select> </div>
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

export default Chart