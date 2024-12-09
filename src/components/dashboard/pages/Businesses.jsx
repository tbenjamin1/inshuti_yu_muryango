
import React, { useEffect, useState } from 'react'
import DashboardLayout from "../DashboardLayout"
import moment from 'moment';
import dayjs from 'dayjs';
import Modal from "./Modal";
import { DatePicker } from 'antd';
import { Pagination } from 'antd';
import { useDispatch, useSelector } from "react-redux";
import { FaRegEdit, FaBookReader, FaTrash } from 'react-icons/fa';

import upload from "../../images/upload.svg";
// import { Document, Page, pdfjs } from 'react-pdf';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

import { fetchAsynBusinessCatgeory, fetchAsynBusinessRegistered, fetchAsyncTransaction, getAllBussinessesCategories, getAllBussinessesRegistered, getAllPaginatedBussinesses, getAllTransaction, getUser } from '../../../redux/transactions/TransactionSlice';
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Businesses() {
    const apiUrljaliKoi = import.meta.env.VITE_API_URL_KOIPAY;
    const apiUrlApidev = import.meta.env.VITE_API_URL_APIDEV;
    const { addToast } = useToasts();
    const user = useSelector(getUser);
    const defaultStartDate = moment().startOf('month').format('YYYY-MM-DD'); // Example: Set default date to the start of the current month
    const defaultEndDate = moment().format('YYYY-MM-DD'); // Set default end date to current date
    const [searchQuery, setSearchQuery] = useState('');

    const allbusinesscategories = useSelector(getAllBussinessesCategories);

    const queryHandleChange = (event) => {
        setSearchQuery(event.target.value);
        searchInTransactions(searchQuery)

    };
    const [viewRider, setViewRider] = useState(false);
    const [viewRiderInfo, setViewRiderInfo] = useState(false);
    const [editBusiness, seteditBusiness] = useState(false);
    const [reward_percentage, setreward_percentage] = useState('');
    const [jalKoi_percentage, setjalKoi_percentage] = useState('');
    const [jalKoi_Calculated_percentage, setCalculatedjalKoi_percentage] = useState("");

    const [certificatepdf, setcertificatepdf] = useState(false);
    const [certificateImg, setcertificateImg] = useState(false);
    const [certificateNoNeImagepdf, setcertificateNoNeImagepdf] = useState(false);

    const handleViewRider = (business) => {
        if (!business.business_certificate) {
            console.log("No certificate found.");
            setcertificateNoNeImagepdf(!certificateNoNeImagepdf);
            setViewRiderInfo(business);
            setViewRider(!viewRider);
            return; // Exit the function if there's no certificate
        }

        console.log("Certificate:", business.business_certificate);

        if (business.business_certificate.includes("image/")) {
            
            setcertificateImg(!certificateImg);
            setViewRiderInfo(business);
            setViewRider(!viewRider);
        } else if (business.business_certificate.includes(".pdf")) {
           
            setcertificatepdf(!certificatepdf);
            setViewRiderInfo(business);
            setViewRider(!viewRider);
        } else {
          
            setcertificateNoNeImagepdf(!certificateNoNeImagepdf);
            setViewRiderInfo(business);
            setViewRider(!viewRider);
        }
    };


    const handleEditBusiness = (business) => {
        // Set the business info and toggle the edit state
        setViewRiderInfo(business);
        seteditBusiness(!editBusiness);
        fillBussinesForm(business);

        // Check the type of business certificate
        if (!business.business_certificate) {
            setcertificateNoNeImagepdf(!certificateNoNeImagepdf);
            return; // Exit early if no certificate is found
        }


        if (business.business_certificate.includes("image/")) {
         
            setcertificateImg(!certificateImg);
        } else if (business.business_certificate.includes(".pdf")) {
          
            setcertificatepdf(!certificatepdf);
        } else {
           
            setcertificateNoNeImagepdf(!certificateNoNeImagepdf);
        }
    };

    const handleViewChildEvent = () => {
        setViewRider(!viewRider);

    };
    const handleEditChildEvent = () => {
        seteditBusiness(!editBusiness);

    };
    const modalRiderTitle = "Business details";
    const Moridebtn_name = "Name";

    const [businesName, setbusinesNameValue] = useState('');
    const [colorCode, setcolorCodeValue] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [contactTel, setcontactTelValue] = useState('');
    const [isRegistered, setIsregistered] = useState(false);
    const [rewardType, setrewardType] = useState('');
    const [businessCategory, setbusinessCategory] = useState('');
    const [email, setEmail] = useState('');

    const [password, setpassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // errors

    const [businesNameError, seterror_name] = useState('');
    const [colorCodeError, setcolor_code] = useState('');
    const [phoneNumberError, setcontact_tel] = useState('');
    const [reward_type, setreward_type] = useState('');
    const [iconError, seticonError] = useState('');
    const [businessCategoryError, setcategory] = useState('');
    const [business_certificate, setbusiness_certificate] = useState('');
    const [momo_tel, setmomo_tel] = useState('');
    const [emailError, setemailError] = useState('');
    const [reward_percentageError, setreward_percentageError] = useState('');
    const [jalKoi_percentageError, setjalKoi_percentageError] = useState('');


    const [passwordError, setpassword_error] = useState('');

    const [loading, setLoading] = useState(false);
    const [isloading, setisLoading] = useState(false);

    const businesNameHandleChange = (event) => {
        setbusinesNameValue(event.target.value);
    };
    const colorCodeHandleChange = (event) => {
        setcolorCodeValue(event.target.value);
    };
    const contactTelHandleChange = (event) => {
        setcontactTelValue(event.target.value);
    };
    const confirmMOMOnumberHandleChange = (event) => {
        setphoneNumber(event.target.value);
        validateMtnPhoneNumber(event.target.value);

    };
    const setrewardTypeHandleChange = (event) => {
        setrewardType(event.target.value);
    };
    const businessCategoryHandleChange = (event) => {
        setbusinessCategory(event.target.value);
    };
    const emailHandleChange = (event) => {
        setEmail(event.target.value);
    };
    const passwordHandleChange = (event) => {
        setpassword(event.target.value);
    };
    const reward_percentageHandleChange = (event) => {
        setreward_percentage(event.target.value);
    };

    // const jalKoi_percentageHandleChange = (event) => {
    //     console.log('viewRiderInfo.reward_percentage ', viewRiderInfo.reward_percentage)
    //     setjalKoi_percentage(event.target.value);
    // };

    const jalKoi_percentageHandleChange = (event) => {
        const selectedPercentage = parseFloat(event.target.value); // Get the selected value as a number
        const businessRewardPercentage = parseFloat(viewRiderInfo.reward_percentage); // Ensure it's a number

        // Calculate Jalikoi reward
        const calculatedJalikoiReward = businessRewardPercentage * selectedPercentage;
        // console.log("Selected Jalikoi percentage:", selectedPercentage);
        // console.log("Existing business reward percentage:", businessRewardPercentage);
        // console.log("Calculated Jalikoi reward:", calculatedJalikoiReward);
        // Update the state with the selected percentage
        setjalKoi_percentage(event.target.value);
        setCalculatedjalKoi_percentage(calculatedJalikoiReward);
        // Optionally update other states or perform actions with `calculatedJalikoiReward`
    };

    const confirmPasswordHandleChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    // Define states for profile image and permit image
    const [file, setFile] = useState('');
    const [certificate, setcertificate] = useState('');
    const [certificateImgae, setcertificateImage] = useState('');
    const [certificateFile, setcertificateFile] = useState('');
    const [renderfile, setrenderFile] = useState('');
    // Profile image upload

    function handleChange(e) {
        setrenderFile(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    const handleCertificateChange = (e) => {
        // setcertificate(URL.createObjectURL(e.target.files[0]));
        // setcertificateFile(e.target.files[0]);


        const selectedFile = e.target.files[0];

        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                // It's an image
                setcertificateImage(URL.createObjectURL(selectedFile));
                setcertificateFile(selectedFile);
                setcertificate('')
            } else if (selectedFile.type === 'application/pdf') {
                setcertificate(URL.createObjectURL(e.target.files[0]));
                setcertificateFile(e.target.files[0]);
                setcertificateImage('')
            } else {
                addToast("Unsupported file type! please try again", {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });

            }
        }



    }
    const validateMtnPhoneNumber = (inputPhoneNumber) => {
        // Pattern: starts with "078" or "079", followed by 7 digits
        const pattern = /^(078|079)[0-9]{7}$/;
        if (
            inputPhoneNumber === "" ||
            !pattern.test(inputPhoneNumber) ||
            inputPhoneNumber.length !== 10
        ) {
            setIsregistered(false);
            return false;
        }
        return true;
    };



    const handleSubmit = async () => {
        const isValidPhoneNumber = validateMtnPhoneNumber(phoneNumber);
        if (!isValidPhoneNumber) {
            // Handle invalid phone number case
            return;
        }

        setLoading(true);
        try {
            const response = await axios.get(
                `${apiUrljaliKoi}/accountholder/information?msisdn=25${phoneNumber}`,
                {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${import.meta.env.VITE_TOKEN_REFEREE}`,
                    },
                }
            );

            addToast(`${response.data.data.firstname} you are registered in momo`, {
                appearance: 'success',
                autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });

            setIsregistered(true);
            setLoading(false);
            //  redirecting the user to the desired page
        } catch (error) {
            addToast("Invalid,use your phone number registered in momo", {
                appearance: 'error', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setIsregistered(false);
            setLoading(false);
        }
    };
    // useEffect(() => {
    //     handleSubmit();
    // }, [phoneNumber]);

    const dispatch = useDispatch()
    const [selectedRange, setSelectedRange] = useState([defaultStartDate, defaultEndDate]);
    const [filteredTransactionList, setFilteredTransactionList] = useState([]);

    const handleDateRangeChange = (dates) => {
        if (dates) {
            const formattedDates = dates.map(dateObj => moment(dateObj.$d).format("YYYY-MM-DD"));
            setSelectedRange(formattedDates);
        }
    };
    const allBussinessesRegisteredList = useSelector(getAllBussinessesRegistered);

    const allPaginatedBussinesses = useSelector(getAllPaginatedBussinesses)

    const searchInTransactions = (searchQuery) => {
        let search = searchQuery.toLowerCase();
        if (search === "") {
            setFilteredTransactionList(allBussinessesRegisteredList);
        } else {
            let filteredList = allBussinessesRegisteredList.filter((transaction) => {
                const business = transaction.name;
                const businessUsername = business ? business.name.toLowerCase() : "";
                const transactionValues = Object.values(transaction).map((value) =>
                    String(value).toLowerCase()
                );
                return (
                    businessUsername.includes(search) ||
                    transactionValues.some((value) => value.includes(search))
                );
            });
            setFilteredTransactionList(filteredList);
        }
    };
    const handleDeleteBusiness = async (businesid) => {
        const confirmation = window.confirm("Do you really want to delete this business?");

        if (confirmation) {
            try {
                const response = await axios.delete(`${apiUrlApidev}/business/${businesid.id}/`);

                addToast('Deleted ', {
                    appearance: 'success',
                });
                dispatch(fetchAsynBusinessRegistered({ selectedRange, currentPage }));
            } catch (error) {
                addToast("Something went wrong! please try again", {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
                setisLoading(false);
            }
        }


    }

    const handleBusinessRegister = async (event) => {

        const businessInform = new FormData();
        businessInform.append('name', businesName);
        businessInform.append('color_code', colorCode);
        businessInform.append('momo_tel', phoneNumber);
        businessInform.append('contact_tel', contactTel);
        businessInform.append('reward_type', rewardType);
        businessInform.append('category', businessCategory);
        businessInform.append('reward_percentage', reward_percentage);
        businessInform.append('groupeya_percentage', jalKoi_Calculated_percentage);
        businessInform.append('email', email);
        businessInform.append('password', password);
        businessInform.append('icon', file);
        businessInform.append('business_certificate', certificateFile);

        event.preventDefault();
        // const isValidPhoneNumber = validateMtnPhoneNumber(phoneNumber);
        // if (!isValidPhoneNumber) {
        //     // Handle invalid phone number case
        //     addToast("Something went wrong! please check your momo number", {
        //         appearance: 'error', autoDismiss: true, // Enable auto dismissal
        //         autoDismissTimeout: 5000,
        //         transitionDuration: 300,
        //     });

        //     return;
        // }

        setisLoading(true)

        try {
            // console.log('updatef', viewRiderInfo)
            const response = await axios.patch(`${apiUrlApidev}/business/${viewRiderInfo.user.id}/   
            `, businessInform, {
                // headers: {
                //     'Access-Control-Allow-Origin': '*',
                // }
            });

            addToast('Successfully updated ', {
                appearance: 'success',
            });
            seteditBusiness(!editBusiness);
            dispatch(fetchAsynBusinessRegistered({ selectedRange, currentPage }));
            setisLoading(false);
            setbusinesNameValue("");
            setcolorCodeValue("");
            setcontactTelValue("");
            setphoneNumber("");
            setrewardType("");
            setbusinessCategory("");
            setEmail("");
            setpassword("");
            setreward_percentage("");
            setjalKoi_percentage("");
            setCalculatedjalKoi_percentage('');
            setIsregistered(false);
        } catch (error) {
            addToast("Something went wrong! please try again", {
                appearance: 'error', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setisLoading(false);
        }
    };


    const isLoading = useSelector((state) => state.transactions.isLoading);
    const [currentPage, setCurrentPage] = useState(1);
    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    const handleApproveBusiness = async () => {
        setLoading(true);
        try {
            const response = await axios.post(`${apiUrlApidev}/approve/${viewRiderInfo.id}/`, {
                // headers: {
                //     'Access-Control-Allow-Origin': '*',
                // }
            });

            addToast(`Successfully approved`, {
                appearance: 'success',
            });
            setViewRider(!viewRider);
            dispatch(fetchAsynBusinessRegistered({ selectedRange, currentPage }));
            setLoading(false);
        } catch (error) {
            addToast("Something went wrong! please try again", {
                appearance: 'error', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setLoading(false);
        }
    };
    const fillBussinesForm = (busines) => {
       
        setbusinesNameValue(busines.name);
        setcolorCodeValue(busines.color_code);
        setcontactTelValue(busines.contact_tel);
        setphoneNumber(busines.momo_tel);

        setrewardType(busines.reward_type);
        setreward_percentage(busines.reward_percentage);
        setjalKoi_percentage(busines.groupeya_percentage);
        setEmail(busines.user ? busines.user.email : '');
        setcertificate(busines.business_certificate ?busines.business_certificate : '');
        setrenderFile(busines.icon ?busines.icon: '');
        setbusinessCategory(busines.category.id);
    };

    useEffect(() => {
        dispatch(fetchAsynBusinessRegistered({ selectedRange, currentPage }))
        dispatch(fetchAsynBusinessCatgeory())
    }, [dispatch, selectedRange, currentPage]);

    return (
        <DashboardLayout>
            <div className='flex justify-center items-center' >
                <div className='bg-white my-4 rounded-lg border container ' >
                    <div className='border-b   px-3 py-3' >Registered Business  </div>
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
                                allBussinessesRegisteredList.length > 0 ? (

                                    <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 border">
                                        <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b">
                                            <tr>
                                                <th scope="col" className="px-2 py-3">
                                                    Business_name
                                                </th>

                                                <th scope="col" className="px-1 py-3">
                                                    category
                                                </th>
                                                <th scope="col" className="px-1 py-3">
                                                    reward_type
                                                </th>
                                                <th scope="col" className="px-1 py-3">
                                                    Phone
                                                </th>
                                                <th scope="col" className="px-1 py-3">
                                                    color_code
                                                </th>
                                                <th scope="col" className="px-1 py-3">
                                                    created_At
                                                </th>
                                                <th scope="col" className="px-1 py-3">
                                                    Status
                                                </th>
                                                <th scope="col" className="px-1 py-3">
                                                    Actions
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>


                                            {
                                                filteredTransactionList.length ? (filteredTransactionList.map((transaction, index) => (
                                                    <tr className="bg-white border-b hover:bg-gray-50 " key={index} >
                                                        <td className="w-4 p-4">
                                                            <span className='px-2 business-name'> {transaction.name ? transaction.name : "N/A"}</span>
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {transaction.category ? transaction.category.name : "N/A"}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {transaction.reward_type ? transaction.reward_type : "N/A"}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {transaction.contact_tel ? transaction.contact_tel : "N/A"}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {transaction.color_code ? transaction.color_code : "N/A"}
                                                        </td>
                                                        <td className="px-6 py-4">
                                                            {moment(transaction.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                        </td>
                                                        <td className="px-6 py-4" >
                                                            {transaction.status === 'locked' && <span className="font-medium FAILED">{transaction.status ? transaction.status : "N/A"}</span>}
                                                            {transaction.status === 'SUCCESS' && <span className="font-medium  SUCCESS">{transaction.status ? transaction.status : "N/A"}</span>}
                                                            {transaction.status === 'CREATED' && <span className="font-medium  CREATED">{transaction.status ? transaction.status : "N/A"}</span>}
                                                            {transaction.status === 'PENDING' && <span className="font-medium  PENDING">{transaction.status ? transaction.status : "N/A"}</span>}
                                                        </td>
                                                    </tr>
                                                ))) : (
                                                    allBussinessesRegisteredList.map((transaction, index) => (
                                                        <tr className="bg-white border-b hover:bg-gray-50 " key={index} >
                                                            <td className="w-4 px-4">
                                                                <span className='px-2 business-name'> {transaction.name ? transaction.name : "N/A"}</span>
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {transaction.category ? transaction.category.name : "N/A"}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {transaction.reward_type ? transaction.reward_type : "N/A"}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {transaction.contact_tel ? transaction.contact_tel : "N/A"}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {transaction.color_code ? transaction.color_code : "N/A"}
                                                            </td>
                                                            <td className="px-6 py-4">
                                                                {moment(transaction.createdAt).format('YYYY-MM-DD HH:mm:ss')}
                                                            </td>
                                                            <td className="px-6 py-4" >
                                                                {transaction.status === 'locked' && <span className="font-medium FAILED">{transaction.status ? transaction.status : "N/A"}</span>}
                                                                {transaction.status === 'building' && <span className="font-medium  SUCCESS">{transaction.status ? transaction.status : "N/A"}</span>}
                                                                {transaction.status === 'CREATED' && <span className="font-medium  CREATED">{transaction.status ? transaction.status : "N/A"}</span>}
                                                                {transaction.status === 'PENDING' && <span className="font-medium  PENDING">{transaction.status ? transaction.status : "N/A"}</span>}
                                                            </td>
                                                            <td className="px-6 py-4 flex justify-around   items-center">
                                                                <FaBookReader className='cursor-pointer ' onClick={() => handleViewRider(transaction)} />
                                                                <FaRegEdit className='cursor-pointer ' onClick={() => handleEditBusiness(transaction)} />
                                                                <FaTrash className='cursor-pointer ' onClick={() => handleDeleteBusiness(transaction)} />

                                                                <Modal setOpenModal={editBusiness} onChildEvent={handleEditChildEvent} Title={modalRiderTitle} button={viewRiderInfo.name} >
                                                                    <div className='flex flex-col my-3   form-width'>
                                                                        <div className='flex justify-between business-image mobile-fit  ' >
                                                                            <div className='flex flex-col w-full mr-1' >
                                                                                <label>
                                                                                    Business name
                                                                                </label>
                                                                                <input type="text" className='' placeholder=' Business name' value={businesName} onChange={businesNameHandleChange}  ></input>
                                                                                <label className='' >
                                                                                    Color code
                                                                                </label>
                                                                                <input type="text" className='' placeholder=' Color code' value={colorCode} onChange={colorCodeHandleChange}  ></input>
                                                                                <span className='flex flex-col' >
                                                                                    <label>
                                                                                        Contact tel
                                                                                    </label>
                                                                                    <input type="text" className='' placeholder=' contact tel' value={contactTel} onChange={contactTelHandleChange}></input>
                                                                                </span>
                                                                            </div>
                                                                            <div className='flex flex-col' >
                                                                                <label className='mx-2' >
                                                                                    Business Icon
                                                                                </label>
                                                                                <div className="upload_container border rounded-lg m-1 ">

                                                                                    {renderfile ? (
                                                                                        <>
                                                                                            <img src={renderfile} alt="Selected Image" className="image" />
                                                                                            <input
                                                                                                type="file"
                                                                                                accept="image/*"
                                                                                                onChange={handleChange}
                                                                                                className="input"
                                                                                            />
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <label htmlFor="uploadInput" className="label">
                                                                                                <img src={upload} alt="Image Icon" className="image" />
                                                                                            </label>
                                                                                            <input
                                                                                                id="uploadInput"
                                                                                                type="file"
                                                                                                accept="image/*"
                                                                                                onChange={handleChange}
                                                                                                className="input-hidden"
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                        <span className='flex flex-col mobile-fit '  >
                                                                            <label>
                                                                                MTN MOMO tel
                                                                            </label>
                                                                            <span className='flex justify-between momo-number ' >
                                                                                <input type="number" className='phone-number' placeholder='MTN MOMO tel' value={phoneNumber} onChange={confirmMOMOnumberHandleChange} ></input>
                                                                                {/* <div className='ml-1 flex' >
                                                                                    {loading && (<div role="status">
                                                                                        <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                                        </svg>
                                                                                        <span class="sr-only">Loading...</span>
                                                                                    </div>)}
                                                                                    {isRegistered && phoneNumber.length === 10 && <span role="img" aria-label="check mark button" class="react-emojis">✅</span>}
                                                                                    {!isRegistered && phoneNumber.length === 10 && <span role="img" aria-label="cross mark" class="react-emojis">❌</span>}
                                                                                </div> */}
                                                                            </span>
                                                                        </span>

                                                                        <div className='flex justify-between mobile-fit '>
                                                                            <div className='flex flex-col w-1/2'  >
                                                                                <label>
                                                                                    Reward type
                                                                                </label>
                                                                                <select required value={rewardType} onChange={setrewardTypeHandleChange} className='rounded border'  >
                                                                                    <option value='' >pick one</option>
                                                                                    <option value='cashback'>cashback</option>
                                                                                    <option value='points'>points</option>
                                                                                </select>
                                                                            </div>

                                                                            <div className='flex flex-col w-1/2 mx-2'  >
                                                                                <label>
                                                                                    Business category
                                                                                </label>
                                                                                <select required value={businessCategory} onChange={businessCategoryHandleChange} className='rounded border'  >
                                                                                    <option value=''  >pick one</option>
                                                                                    {allbusinesscategories &&
                                                                                        allbusinesscategories.map((category) => (
                                                                                            <option key={category.id} value={category.id}>
                                                                                                {category.name}
                                                                                            </option>
                                                                                        ))}
                                                                                </select>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex justify-between mobile-fit '>
                                                                            <span className='flex flex-col w-1/2'>
                                                                                <label>
                                                                                    Reward percentage
                                                                                </label>
                                                                                <input type="text" className='' placeholder=' Reward percentage' value={reward_percentage} onChange={reward_percentageHandleChange}></input>
                                                                                {reward_percentageError && <p class="mt-2   text-pink-600 text-sm">
                                                                                    {reward_percentageError}
                                                                                </p>}
                                                                            </span>
                                                                            <span className='flex flex-col w-1/2 mx-2'>
                                                                                <label>
                                                                                    Email (admin account)
                                                                                </label>
                                                                                <input type="text" className='' placeholder='Email' value={email} onChange={emailHandleChange}></input>
                                                                            </span>
                                                                        </div>

                                                                        <div className='flex justify-between mobile-fit '>
                                                                            <span className='flex flex-col w-1/2'>
                                                                                <label>
                                                                                    jali koi rewards
                                                                                </label>
                                                                                <span className='pb-1' >{viewRiderInfo.groupeya_percentage ? viewRiderInfo.groupeya_percentage : "N/A"}</span>
                                                                                <select required value={jalKoi_percentage} onChange={jalKoi_percentageHandleChange} className='rounded border'  >
                                                                                    <option value='' >Jali koi rewards</option>
                                                                                    <option value='0.5'>1/2</option>
                                                                                    <option value='0.33'>1/3</option>
                                                                                    <option value='0.25'>1/4</option>
                                                                                    <option value='0.2'>1/5</option>
                                                                                </select>

                                                                                {jalKoi_percentageError && <p class="mt-2   text-pink-600 text-sm">
                                                                                    {jalKoi_percentageError}
                                                                                </p>}
                                                                            </span>

                                                                        </div>

                                                                        <div className='flex justify-between business-image mobile-fit  ' >

                                                                            <div className='flex flex-col' >
                                                                                <label className='mx-2' >
                                                                                    Business certificate 
                                                                                </label>
                                                                                <div className='my-3'>
                                                                                    {certificate && <a href={certificate} className='bg-slate-300 p-2 rounded-lg' download='Certificate.pdf' target="_blank" rel="noopener noreferrer">
                                                                                        Download Certificate
                                                                                    </a>}
                                                                                </div>
                                                                                <div className="certificate-container p-3  rounded-lg m-1 border ">

                                                                                    {certificateImgae ? (
                                                                                        <>
                                                                                            {certificateImgae && <img src={certificateImgae} alt="Selected Image" className="image-certificate" />}
                                                                                            {/* {certificate && <Document file={certificate} onLoadSuccess={({ numPages }) => setNumPages(numPages)} style={{ width: '100%', height: '100px' }}>
                                                                                                <Page pageNumber={pageNumber} />
                                                                                            </Document>} */}
                                                                                           
                                                                                            <input
                                                                                                id="certificateUploadInput"
                                                                                                type="file"
                                                                                                accept="application/pdf,image/*"
                                                                                                onChange={handleCertificateChange}
                                                                                                className="input"
                                                                                            />
                                                                                        </>
                                                                                    ) : (
                                                                                        <>
                                                                                            <label htmlFor="certificateUploadInput" className="label">
                                                                                                <img src={upload} alt="Image Icon" className="image" />
                                                                                            </label>
                                                                                            <input
                                                                                                id="certificateUploadInput"
                                                                                                type="file"
                                                                                                accept="application/pdf,image/*"
                                                                                                onChange={handleCertificateChange}
                                                                                                className="input-hidden"
                                                                                            />
                                                                                        </>
                                                                                    )}
                                                                                </div>
                                                                            </div>
                                                                        </div>

                                                                        <span className='flex justify-between items-center approve-container '>
                                                                            <button className='fom-btn w-1/3 p-2 my-3' onClick={handleBusinessRegister} >
                                                                                {!isloading ? (<div className='mr-4 submit-btn-center' >Update</div>) : (<div role="status">
                                                                                    <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                                    </svg>
                                                                                    <span class="sr-only">Loading...</span>
                                                                                </div>)} </button>

                                                                        </span>
                                                                    </div>
                                                                </Modal>

                                                                <Modal setOpenModal={viewRider} onChildEvent={handleViewChildEvent} Title={modalRiderTitle} button={viewRiderInfo.name} >
                                                                    <div className='flex flex-col my-3   form-width'>
                                                                        <div className='flex justify-between business-image mobile-fit  ' >
                                                                            <div className='flex flex-col w-full mr-1' >
                                                                                <label>
                                                                                    Business name
                                                                                </label>
                                                                                <span> {viewRiderInfo.name ? viewRiderInfo.name : "N/A"} </span>
                                                                                <label className='' >
                                                                                    Color code
                                                                                </label>
                                                                                <span>{viewRiderInfo.color_code ? viewRiderInfo.color_code : "N/A"}</span>
                                                                                <span className='flex flex-col' >
                                                                                    <label>
                                                                                        Contact tel
                                                                                    </label>
                                                                                    <span>{viewRiderInfo.contact_tel ? viewRiderInfo.contact_tel : "N/A"}</span>
                                                                                </span>
                                                                            </div>
                                                                            <div className='flex flex-col' >
                                                                                <label className='mx-2' >
                                                                                    Business Icon
                                                                                </label>
                                                                                <div className="upload_container border rounded-lg m-1 ">
                                                                                    {viewRiderInfo.icon ? <img src={viewRiderInfo.icon ? viewRiderInfo.icon : upload} alt="Selected Image" className="image" /> : <img src={upload} alt="Selected Image" className="image" />}

                                                                                </div>
                                                                            </div>

                                                                        </div>

                                                                        <span className='flex flex-col mobile-fit  my-2 '  >
                                                                            <label>
                                                                                MTN MOMO tel
                                                                            </label>
                                                                            <span>{viewRiderInfo.momo_tel ? viewRiderInfo.momo_tel : "N/A"}</span>

                                                                        </span>

                                                                        <div className='flex justify-between mobile-fit my-2  '>
                                                                            <div className='flex flex-col '  >
                                                                                <label>
                                                                                    Reward type
                                                                                </label>
                                                                                <span>{viewRiderInfo.reward_type ? viewRiderInfo.reward_type : "N/A"}</span>

                                                                            </div>


                                                                            <div className='flex flex-col  mx-2'  >
                                                                                <label>
                                                                                    Business category
                                                                                </label>
                                                                                <span>{viewRiderInfo.category ? viewRiderInfo.category.name : "N/A"}</span>
                                                                            </div>
                                                                        </div>
                                                                        <div className='flex flex-col justify-between mobile-fit  my-2  ' >
                                                                            <span className='flex flex-col' >
                                                                                <label>
                                                                                    Reward percentage
                                                                                </label>
                                                                                <span>{viewRiderInfo.reward_percentage ? viewRiderInfo.reward_percentage : "N/A"} %</span>
                                                                            </span>
<br />
                                                                            <span className='flex flex-col' >
                                                                                <label>
                                                                                    Jali Koi percentage
                                                                                </label>
                                                                                <span>{viewRiderInfo.groupeya_percentage ? viewRiderInfo.groupeya_percentage : "N/A"}</span>
                                                                            </span>

<br />
                                                                            <span className='flex flex-col' >
                                                                                <label>
                                                                                    Email (admin account)
                                                                                </label>
                                                                                <span>{viewRiderInfo.user ? viewRiderInfo.user.email : "N/A"}</span>
                                                                            </span>

                                                                        </div>

                                                                        <div className='flex justify-between business-image mobile-fit  ' >

                                                                            <div className='flex flex-col' >
                                                                                <label className='mx-2' >
                                                                                    Business certificate 
                                                                                </label>
                                                                                <div className='my-3'>
                                                                                    {certificatepdf && <a href={viewRiderInfo.business_certificate} className='bg-slate-300 p-2 rounded-lg' download='Certificate.pdf' target="_blank" rel="noopener noreferrer">
                                                                                        Download Certificate
                                                                                    </a>}
                                                                                </div>
                                                                                {certificateImgae && 
                                                                                    <div className="certificate-container p-3  rounded-lg m-1 border ">
                                                                                        <img src={certificateImgae ? certificateImgae : upload} alt="Selected Image" className="image-certificate" />
                                                                                    </div>
                                                                                }
                                                                                
                                                                                {!viewRiderInfo.business_certificate && <img src={upload} alt="Selected Image" className="image" />}
                                                                            </div>

                                                                        </div>

                                                                        <button className='fom-btn-approve w-1/3 p-2 my-3' onClick={() => handleApproveBusiness()} >
                                                                            {!loading ? (<div className='mr-4 submit-btn-center' >Approve</div>) : (<div role="status">
                                                                                <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                                                </svg>
                                                                                <span class="sr-only">Loading...</span>
                                                                            </div>)}
                                                                        </button>

                                                                    </div>
                                                                </Modal>

                                                            </td>
                                                        </tr>
                                                    ))
                                                )
                                            }
                                        </tbody>
                                    </table>

                                ) : (
                                    <div className='flex justify-center m-5 p-4'>

                                    </div>
                                )}


                        </div>

                        {allPaginatedBussinesses && (
                            <div className='flex justify-end my-3'>
                                <Pagination defaultCurrent={1} total={allPaginatedBussinesses.count} onChange={handlePageChange} className="border p-3 rounded-lg" />
                            </div>
                        )}


                    </div>
                </div>
            </div>
        </DashboardLayout>
    )
}

export default Businesses