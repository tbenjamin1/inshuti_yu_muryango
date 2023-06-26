

import React, { useEffect, useState } from 'react'
import DashboardLayout from "../DashboardLayout"
import moment from 'moment';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { fetchAsyncTransaction, getAllTransaction } from '../../../redux/transactions/TransactionSlice';
function Electricity() {
    const defaultStartDate = moment().startOf('month').format('YYYY-MM-DD'); // Example: Set default date to the start of the current month
    const defaultEndDate = moment().format('YYYY-MM-DD'); // Set default end date to current date
    const [searchQuery, setSearchQuery] = useState('');

    const queryHandleChange = (event) => {
        setSearchQuery(event.target.value);
        searchInTransactions(searchQuery)

    };
    const dispatch = useDispatch()
    const [selectedRange, setSelectedRange] = useState([defaultStartDate, defaultEndDate]);
    const [filteredTransactionList, setFilteredTransactionList] = useState([]);
    const handleDateRangeChange = (dates) => {
        if (dates) {
            const formattedDates = dates.map(dateObj => moment(dateObj.$d).format("YYYY-MM-DD"));
            setSelectedRange(formattedDates);
        }
    };
    const transactionList = useSelector(getAllTransaction);
    const searchInTransactions = (searchQuery) => {
        let search = searchQuery.toLowerCase();
        if (search === "") {
            setFilteredTransactionList(transactionList);
        } else {
            let filteredList = transactionList.filter((transaction) => {
                const customer = transaction.customer;
                const customerUsername = customer ? customer.username.toLowerCase() : "";
                const transactionValues = Object.values(transaction).map((value) =>
                    String(value).toLowerCase()
                );
                return (
                    customerUsername.includes(search) ||
                    transactionValues.some((value) => value.includes(search))
                );
            });
            setFilteredTransactionList(filteredList);
        }
    };
    const isLoading = useSelector((state) => state.transactions.isLoading);
    
    useEffect(() => {
        dispatch(fetchAsyncTransaction(selectedRange))
    }, [dispatch, selectedRange]);
    return (
        <DashboardLayout>
            <div className='flex justify-center items-center' >
                <div className='bg-white my-4 rounded-lg border container ' >
                    <div className='border-b   px-3 py-3' >Electricity transactions </div>
                    <div className='   px-3 py-3' >

                        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
                            <div className="flex items-center justify-between pb-4">
                                <div>
                                    <DatePicker.RangePicker onChange={handleDateRangeChange} defaultValue={[dayjs(defaultStartDate), dayjs(defaultEndDate)]}
                                        format="YYYY-MM-DD" />
                                </div>
                                <label for="table-search" className="sr-only">Search</label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    </div>
                                    <input type="text" id="table-search" value={searchQuery} onChange={queryHandleChange} className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80  focus:ring-blue-500 focus:border-blue-500  dark:placeholder-gray-400  dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search by name" />
                                </div>
                            </div>

                            {isLoading && (<div role="status" className='flex justify-center my-5' >
                                <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>)}
                            {


                                transactionList.length > 0 ? (

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


                                            {
                                                filteredTransactionList.length ? (filteredTransactionList.map((transaction, index) => (
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

                                                        {moment(transaction.createdAt).format('YYYY-MM-DD HH:mm:ss')}

                                                        </td>
                                                        <td className="px-6 py-4" >
                                                            {transaction.statusDesc === 'FAILED' && <span className="font-medium FAILED">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                            {transaction.statusDesc === 'SUCCESS' && <span className="font-medium  SUCCESS">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                            {transaction.statusDesc === 'CREATED' && <span className="font-medium  CREATED">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                            {transaction.statusDesc === 'PENDING' && <span className="font-medium  PENDING">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                        </td>
                                                    </tr>
                                                ))) : (
                                                    transactionList.map((transaction, index) => (
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

                                                            {moment(transaction.createdAt).format('YYYY-MM-DD HH:mm:ss')}

                                                            </td>
                                                            <td className="px-6 py-4" >
                                                                {transaction.statusDesc === 'FAILED' && <span className="font-medium FAILED">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                                {transaction.statusDesc === 'SUCCESS' && <span className="font-medium  SUCCESS">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                                {transaction.statusDesc === 'CREATED' && <span className="font-medium  CREATED">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                                {transaction.statusDesc === 'PENDING' && <span className="font-medium  PENDING">{transaction.statusDesc ? transaction.statusDesc : "N/A"}</span>}
                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </table>




                                ) : (
                                    <div className='flex justify-center m-5 p-4'>
                                        No transaction for selected date range
                                    </div>
                                )}


                        </div>

                        {transactionList && (
                            <div className='flex justify-end my-3'>
                                <Pagination defaultCurrent={6} total={transactionList.length} className="border p-3 rounded-lg" />
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Electricity