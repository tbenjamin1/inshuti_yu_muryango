import React from 'react';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsynBusinessReport, getAllBusinessReport } from '../../../../redux/transactions/TransactionSlice';

const TopCustomer = () => {
  const dispatch = useDispatch();
  const businessReport = useSelector(getAllBusinessReport);
  useEffect(() => {
    dispatch(fetchAsynBusinessReport())
}, [dispatch]);

const options = {
  series: businessReport.top_5_clients ?businessReport.top_5_clients.map(item => item.total_points) : [],
  chart: {
    width: 380,
    type: 'pie',
  },
  labels: businessReport.top_5_clients ? businessReport.top_5_clients.map(item => `Client ${item.client_id}`) : [],
  responsive: [
    {
      breakpoint: 480,
      options: {
        chart: {
          width: 200,
        },
        legend: {
          position: 'bottom',
        },
      },
    },
  ],
};

  return (
    <div className='w-full' >
      {businessReport&&<ReactApexChart options={options} series={options.series} type="pie" height={350} />}
    </div>
  );
};

export default TopCustomer;
