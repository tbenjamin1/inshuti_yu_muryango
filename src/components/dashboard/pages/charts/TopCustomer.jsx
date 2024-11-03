import React from 'react';
import { useEffect } from 'react';
import ReactApexChart from 'react-apexcharts';
import { useDispatch, useSelector } from "react-redux";
import { fetchAsynBusinessTopClientsReport, getAllTopBusinessReport, getUser } from '../../../../redux/transactions/TransactionSlice';

const TopCustomer = () => {
  const dispatch = useDispatch();
  const topBusinessReport = useSelector(getAllTopBusinessReport);
  const user = useSelector(getUser);
 
  useEffect(() => {
    dispatch(fetchAsynBusinessTopClientsReport({ user }))
  }, [dispatch]);

  const options = {
    series: topBusinessReport ? topBusinessReport.top_clients.map(item => item.total_points) : [],
    chart: {
      width: 380,
      type: 'pie',
    },
    labels: topBusinessReport ? topBusinessReport.top_clients.map(item => `Client ${item.client__username}`) : [],
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
      {topBusinessReport && <ReactApexChart options={options} series={options.series} type="pie" height={350} />}
    </div>
  );
};

export default TopCustomer;
