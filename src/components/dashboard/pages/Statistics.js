import React from 'react'
import DashboardLayout from "../DashboardLayout"
import { useEffect, useState } from "react";
import {useDispatch,useSelector} from "react-redux";
import dashboardApi from '../../../api/DashboardApi';
import moment from 'moment';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { Pagination } from 'antd';
import { addTransactions, fetchAsynClients, fetchAsynRefree, getAllClientsList, getAllRefree } from '../../../redux/transactions/TransactionSlice';
import Chart from "./Chart"

function Statistics() {
  
  const defaultStartDate = moment().startOf('year').format('YYYY-MM-DD'); // Example: Set default date to the start of the current month
  const defaultEndDate = moment().format('YYYY-MM-DD'); // Set default end date to current date
  const [selectedRange, setSelectedRange] = useState([defaultStartDate, defaultEndDate]);
  const dispatch = useDispatch();
  const clientList = useSelector(getAllClientsList);
  const refereeList=useSelector(getAllRefree)


  useEffect(() => {
    dispatch(fetchAsynRefree())
    dispatch(fetchAsynClients(selectedRange))
}, [dispatch,selectedRange]);

  
  return (
    <DashboardLayout>
      <div className=' flex justify-center items-center' >
        <div className='container' >
          <div className='flex justify-between items-center'>
           {clientList.data &&  <div className='card border bg-white flex flex-col px-3  py-5 rounded-lg w-1/5' >
              <span className='card-title' >Customer</span>
              <span className='card-title-sub my-3' >{clientList.data.totalCount} </span>
              <span className='card-title-footer' >
               from<small className='bg-green-200 py-1 px-2 rounded-full mx-1 ' >  { moment(defaultStartDate).format('YYYY-MMM')} </small> to <small className='bg-gray-200 py-1 px-2  text-gray-800 rounded-full' >{moment(defaultEndDate).format('YYYY-MMM')} </small>
              </span>
            </div>}

            {refereeList.data &&  <div className='card border bg-white flex flex-col px-3  py-5 rounded-lg w-1/5' >
              <span className='card-title' >Referees</span>
              <span className='card-title-sub my-3' >{refereeList.data.totalCount} </span>
              <span className='card-title-footer' >
               from<small className='bg-purple-200 py-1 px-2 rounded-full mx-1 ' >  { moment(defaultStartDate).format('YYYY-MMM')} </small> to <small className='bg-gray-200 py-1 px-2 rounded-full text-gray-800' >{moment(defaultEndDate).format('YYYY-MMM')} </small>
              </span>
            </div>}
            <div className='card border bg-white flex flex-col px-3 py-5 rounded-lg w-1/5' >
              <span className='card-title' >Revenue</span>
              <span className='card-title-sub my-3' >$345,687</span>
              <span className='card-title-footer' >
                <small className='bg-gray-200 py-1 px-2 rounded-full text-gray-800  ' >+45%</small> from <small>4.6%</small>
              </span>
            </div>
            <div className='card border bg-white flex flex-col px-3 py-5 rounded-lg w-1/5' >
              <span className='card-title' >Revenue</span>
              <span className='card-title-sub my-3' >$345,687</span>
              <span className='card-title-footer' >
                <small className='bg-green-200 py-1 px-2 rounded-full  ' >+45%</small> from <small>4.6%</small>
              </span>
            </div>
          </div>
          <div className='bg-white my-4 rounded-lg border ' >
            <div className='border-b   px-3 py-3' >Perfomance</div>
            <div className='   px-3 py-3' >
              <Chart/>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>

  )
}

export default Statistics