import React from 'react';
import * as FileSaver from 'file-saver'
// import XLSX from 'sheetjs-style'
import moment from 'moment';
const ExcelExport = ({ excelData,Amount }) => {

  const fileType='Application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  const fileExtension ='.xlsx';
  const fileName='bought-items';
  const exportToExcel = async () =>{
    // Calculate the total units
  const totalUnits = excelData.reduce((total, item) => total + item.number, 0);
    const data = [
      // Excel header row
      [
        'Internal Txn Id',
        'Name',
        'Price',
        'Number/Unit',
        'Amount',
        'Done_at',
      ],
      // Data rows
      ...excelData.map((item) => [
        item.dailyTransactionForMobile.internalTxnId,
        item.item.name,
        item.item.price,
        item.number,
        item.item ? item.item.price * item.number : 'N/A',
        item.dailyTransactionForMobile
          ? moment(item.dailyTransactionForMobile.createdAt).format(
              'MMM Do YYYY, h:mm:ss a'
            )
          : 'N/A',
      ]),
      // Total row
      [
        '',
        '',
        '',
        `Total unit: ${totalUnits}`,
        `Total amount: ${Amount} RWF`,
        '',
      ],
    ]
    const ws = XLSX.utils.json_to_sheet(data);
    const wb ={Sheets:{'data':ws},SheetNames:['data']};
    const excelBuffer =XLSX.write(wb,{bookType:'xlsx',type:'array'});
    const datafile = new Blob([excelBuffer],{type:fileType});


    FileSaver.saveAs(datafile,fileName+fileExtension);
  }

  return (
    <div>
      {/* Create a button or trigger to initiate the export */}
      <button onClick={exportToExcel} className='bg-red-500 text-white rounded-md px-3 py-2 cursor-pointer' >Export to Excel</button>

      
    </div>
  );

  
};

export default ExcelExport;
