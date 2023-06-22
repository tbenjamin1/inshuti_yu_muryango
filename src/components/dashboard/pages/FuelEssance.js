import React, { useEffect, useState } from 'react'
import DashboardLayout from "../DashboardLayout"
import dasboardApi from "../../../api/DashboardApi"
import moment from 'moment';
import dayjs from 'dayjs';
import { DatePicker } from 'antd';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from "react-redux"
import { addTransactions, getAllTransaction } from '../../../redux/transactions/TransactionSlice';
function FuelEssance() {
  const defaultStartDate = moment().startOf('month').format('YYYY-MM-DD'); // Example: Set default date to the start of the current month
  const defaultEndDate = moment().format('YYYY-MM-DD'); // Set default end date to current date

  
  const dispatch = useDispatch()
  const [selectedRange, setSelectedRange] = useState([defaultStartDate, defaultEndDate]);
  const handleDateRangeChange = (dates) => {
    const formattedDates = dates.map(dateObj => moment(dateObj.$d).format("YYYY-MM-DD"));
    setSelectedRange(formattedDates);
   

  };
  
  const transactionListing = useSelector(getAllTransaction);
  console.log("transactionListing", transactionListing);
  // Fetch data based on the selected date range

  const fetchFuelData = async (selectedRange) => {
    const response = await dasboardApi.get(`?service=96b33985-1045-437c-9415-ff8a248978db&startDate=${selectedRange[0]}&endDate=${selectedRange[1]}`).catch((error) => {
      console.log(error)
    });
    dispatch(addTransactions(response.data))
  };
  useEffect(() => {
    fetchFuelData(selectedRange);
  }, [selectedRange]);
  return (
    <DashboardLayout>
      <div className='flex justify-center items-center' >
        <div className='bg-white my-4 rounded-lg border container ' >
          <div className='border-b   px-3 py-3' >transaction</div>
          <div className='   px-3 py-3' >

            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <div className="flex items-center justify-between pb-4">
                <div>
                  <DatePicker.RangePicker onChange={handleDateRangeChange}  defaultValue={[dayjs(defaultStartDate), dayjs(defaultEndDate)]}
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

              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Product Id
                    </th>

                    <th scope="col" className="px-6 py-3">
                      Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Color
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Price
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-search-1" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-search-1" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                      Apple MacBook Pro 17"
                    </th>
                    <td className="px-6 py-4">
                      Silver
                    </td>
                    <td className="px-6 py-4">
                      Laptop
                    </td>
                    <td className="px-6 py-4">
                      $2999
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                    </td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-search-2" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-search-2" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Microsoft Surface Pro
                    </th>
                    <td className="px-6 py-4">
                      White
                    </td>
                    <td className="px-6 py-4">
                      Laptop PC
                    </td>
                    <td className="px-6 py-4">
                      $1999
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                    </td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-search-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-search-3" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Magic Mouse 2
                    </th>
                    <td className="px-6 py-4">
                      Black
                    </td>
                    <td className="px-6 py-4">
                      Accessories
                    </td>
                    <td className="px-6 py-4">
                      $99
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                    </td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-3" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Apple Watch
                    </th>
                    <td className="px-6 py-4">
                      Silver
                    </td>
                    <td className="px-6 py-4">
                      Accessories
                    </td>
                    <td className="px-6 py-4">
                      $179
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                    </td>
                  </tr>
                  <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-3" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      iPad
                    </th>
                    <td className="px-6 py-4">
                      Gold
                    </td>
                    <td className="px-6 py-4">
                      Tablet
                    </td>
                    <td className="px-6 py-4">
                      $699
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                    </td>
                  </tr>
                  <tr className="bg-white  dark:hover:bg-gray-600">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <input id="checkbox-table-3" type="checkbox" className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" />
                        <label for="checkbox-table-3" className="sr-only">checkbox</label>
                      </div>
                    </td>
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      Apple iMac 27"
                    </th>
                    <td className="px-6 py-4">
                      Silver
                    </td>
                    <td className="px-6 py-4">
                      PC Desktop
                    </td>
                    <td className="px-6 py-4">
                      $3999
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className='flex justify-end my-3' >
              <Pagination defaultCurrent={6} total={500} className="border p-3 rounded-lg" />
            </div>

          </div>
        </div>
      </div>
    </DashboardLayout>
  )
}

export default FuelEssance