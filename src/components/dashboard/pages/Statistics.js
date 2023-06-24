import React from 'react'
import DashboardLayout from "../DashboardLayout"
import { useEffect, useState } from "react";
import {useDispatch} from "react-redux";
import dashboardApi from '../../../api/DashboardApi';
import { addTransactions } from '../../../redux/transactions/TransactionSlice';
import Chart from "./Chart"

function Statistics() {
  
  return (
    <DashboardLayout>
      <div className=' flex justify-center items-center' >
        <div className='container' >
          <div className='flex justify-between items-center'>
            <div className='card border bg-white flex flex-col px-3  py-5 rounded-lg w-1/5' >
              <span className='card-title' >Revenue</span>
              <span className='card-title-sub my-3' >$345,687</span>
              <span className='card-title-footer' >
                <small className='bg-green-200 py-1 px-2 rounded-full ' >+45%</small> from <small>4.6%</small>
              </span>
            </div>
            <div className='card border bg-white flex flex-col px-3 py-5 rounded-lg w-1/5' >
              <span className='card-title' >Revenue</span>
              <span className='card-title-sub my-3' >$345,687</span>
              <span className='card-title-footer' >
                <small className='bg-red-200 py-1 px-2 rounded-full text-red-500 ' >+45%</small> from <small>4.6%</small>
              </span>
            </div>
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