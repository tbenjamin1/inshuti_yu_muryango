

import React, { useEffect, useState } from 'react'
import DashboardLayout from "../DashboardLayout"
import moment from 'moment';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { fetchAsyncAirtelTransaction, getAllAirtelTransaction } from '../../../redux/transactions/TransactionSlice';
function AirtelTransaction() {
    const defaultStartDate = moment().startOf('month').format('YYYY-MM-DD'); // Example: Set default date to the start of the current month
    const defaultEndDate = moment().format('YYYY-MM-DD'); // Set default end date to current date
    const dispatch = useDispatch()
    const [selectedRange, setSelectedRange] = useState([defaultStartDate, defaultEndDate]);

    const handleDateRangeChange = (dates) => {
        
        if(dates){
        const formattedDates = dates.map(dateObj => moment(dateObj.$d).format("YYYY-MM-DD"));
        setSelectedRange(formattedDates);
    }
    };
    const airtelTransactionList = useSelector(getAllAirtelTransaction);

    useEffect(() => {
        dispatch(fetchAsyncAirtelTransaction(selectedRange))
    }, [dispatch, selectedRange]);


    return (
        <DashboardLayout>
            <div className='flex justify-center items-center' >
                <div className='bg-white my-4 rounded-lg border container ' >
                    <div className='border-b   px-3 py-3' > Airtel transactions </div>
                    <div className='px-3 py-3'>
                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="flex items-center justify-between pb-4">
                                <div>
                                    <DatePicker.RangePicker onChange={handleDateRangeChange} defaultValue={[dayjs(defaultStartDate), dayjs(defaultEndDate)]}
                                        format="YYYY-MM-DD" />
                                </div>
                                <label for="table-search" className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                        {/* <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path></svg> */}
                                    </div>
                                    <input type="text" id="table-search" className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for items" />
                                </div>
                            </div>

                            {airtelTransactionList.length > 0 ? (
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
                                        <tr>
                                            <th scope="col" className="px-6 py-3">
                                                ExternalTxnId
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                InternalTxnId
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Customer
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Phone
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Price/RWF
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                created_At
                                            </th>
                                            <th scope="col" className="px-6 py-3">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {airtelTransactionList.map((transaction, index) => (
                                            <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600" key={index} >
                                                <td className="w-4 p-4">
                                                    <div className="flex items-center">
                                                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                                                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                                                        <span className='px-2'> {transaction.externalTxnId ? transaction.externalTxnId : "N/A"}</span>
                                                    </div>
                                                </td>
                                                <td className="px-6 py-4">
                                                    {transaction.internalTxnId ? transaction.internalTxnId : "N/A"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {transaction.customer ? transaction.customer.username : "N/A"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {transaction.customer ? transaction.customer.phone : "N/A"}
                                                </td>
                                                <td className="px-6 py-4">
                                                    {transaction.amount ? transaction.amount : "N/A"}
                                                </td>
                                                <td className="px-6 py-4">

                                                    {moment(transaction.created_at).format('YYYY-MM-DD HH:mm:ss')}
                                                </td>
                                                <td className="px-6 py-4" >
                                                    {transaction.statusDesc === 'FAILED' && <span className="font-medium FAILED ">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                    {transaction.statusDesc === 'SUCCESS' && <span className="font-medium  SUCCESS ">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                    {transaction.statusDesc === 'CREATED' && <span className="font-medium  CREATED ">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                    {transaction.statusDesc === 'PENDING' && <span className="font-medium  PENDING ">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>) : (
                                <div className='flex justify-center m-5 p-4'>
                                    No transaction for selected date
                                </div>
                            )}
                        </div>
                        {airtelTransactionList && (
                            <div className='flex justify-end my-3'>
                                <Pagination defaultCurrent={6} total={airtelTransactionList.length} className="border p-3 rounded-lg" />
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default AirtelTransaction
