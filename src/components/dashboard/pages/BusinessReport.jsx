import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
// import main_logo from "../../images/park.jpeg";
import main_logo from "../../images/main_logo.png";
import groupeya from "../../images/Groupeya_logo .png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux"
import { faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Modal from './Modal';
import axios from 'axios';
import moment from 'moment';
import dayjs from 'dayjs';
import { DatePicker, Select } from 'antd';
import { Pagination } from 'antd';
import { useToasts } from 'react-toast-notifications';
import { fetchAsynBoughtItems, fetchAsynBusinessCatgeory, fetchAsynBusinessReport, fetchAsynBusinessTransactionList, fetchAsynItems, fetchAsynNonPaginatedItems, fetchAsynParkCatgories, fetchAsynParkUnit, fetchAsynSingleBusiness, getAllBusinessReport, getAllBussinessesCategories, getAllfetchAsynBusinessTransactionList, getAllfetchAsynpaginatedBusinessTransaction, getAllNonPaginatedItems, getAllparkCategories, getAllparkPickBoughtItemsList, getAllparkPickItemsList, getAllparkPickPaginatedBoughtItemsList, getAllparkPickPaginatedItems, getAllparkUnitList, getsingleBussiness, getUser } from '../../../redux/transactions/TransactionSlice';
// import ExcelExport from '../parkpick/pages/ExcelExport';
import Chart from './Chart';
import TopCustomer from './charts/TopCustomer';
import Monthly from './charts/Monthly';

import Filter from '../../filter';
import upload from "../../images/upload.svg";
import { Document, Page, pdfjs } from 'react-pdf';
pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

const ParkPick = () => {

    const user = useSelector(getUser);

    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const defaultStartDate = moment().startOf('month').format('YYYY-MM-DD'); // Example: Set default date to the start of the current month
    const defaultEndDate = moment().format('YYYY-MM-DD'); // Set default end date to current date
    const [selectedRange, setSelectedRange] = useState([defaultStartDate, defaultEndDate]);
    const [filterItem, setfilterItem] = useState('');
    const [filterStatus, setfilterStatus] = useState('');
    const [isThisMonth, setIsThisMonth] = useState(true);

    // week days
    const [firstDayOfWeek, SetweekFirstDay] = useState('');
    const [lastDayOfWeek, SetweekLastDay] = useState('');

    // month day
    const [firstDayOfMonth, SetweekFirstMonth] = useState('');
    const [lastDayOfMonth, SetweekLastMonth] = useState('');


    const getDayOfWeek = () => {
        setIsThisMonth(false);
        const startDate = moment().startOf('isoWeek').format('YYYY-MM-DD');
        const endDate = moment().endOf('isoWeek').add(1, 'day').format('YYYY-MM-DD');
        setSelectedRange([startDate, endDate]);
        SetweekFirstDay(startDate);
        SetweekLastDay(endDate);
        SetweekFirstMonth('');
        SetweekLastMonth('');



    }

    const getDayOfMonth = () => {
        setIsThisMonth(true);
        const startDate = moment().startOf('month').format('YYYY-MM-DD');
        const endDate = moment().endOf('month').add(1, 'day').format('YYYY-MM-DD');
        setSelectedRange([startDate, endDate]);
        SetweekFirstMonth(startDate);
        SetweekLastMonth(endDate);
        SetweekFirstDay('');
        SetweekLastDay('');

    }


    const handleDateRangeChange = (dates) => {
        if (dates) {
            const formattedDates = dates.map(dateObj => moment(dateObj.$d).format("YYYY-MM-DD"));
            // Add one day to the end date (formattedDates[1])
            formattedDates[1] = moment(formattedDates[1]).add(1, 'day').format("YYYY-MM-DD");
            setSelectedRange(formattedDates);
        }
    };
    const onStatusChange = (value) => {
        setfilterStatus(value)
    };
    const onItemsChange = (value) => {
        setfilterItem(value)
    };
    const onSearch = (value) => {
    };

    // Filter `option.label` match the user type `input`
    const filterOption = (input, option) => (option?.label ?? '').toLowerCase().includes(input.toLowerCase());


    const [activeTab, setActiveTab] = useState('summary');
    const [open, setOpen] = useState(false);
    const [pagetransactions, setPagetransaction] = useState(1);
    const [category, setcategoryOpen] = useState(false);
    const [unity, setUnityModalOpen] = useState(false);

    const [numPages, setNumPages] = useState(null);
    const [pageNumber, setPageNumber] = useState(1);
    const [certificatepdf, setcertificatepdf] = useState(false);
    const [certificateImg, setcertificateImg] = useState(false);
    const [certificateNoNeImagepdf, setcertificateNoNeImagepdf] = useState(false);

    const categoriesList = useSelector(getAllparkCategories);

    const boughtItemsList = useSelector(getAllparkPickBoughtItemsList);
    const nonPaginatedItemsList = useSelector(getAllNonPaginatedItems);
    const singleBusinessdetails = useSelector(getsingleBussiness);



    const singleBusinesstrnsactions = useSelector(getAllfetchAsynBusinessTransactionList);
    const paginatedBusinessTransactions = useSelector(getAllfetchAsynpaginatedBusinessTransaction)
    const businessReport = useSelector(getAllBusinessReport);
    


    const total = boughtItemsList ? boughtItemsList.reduce((accumulator, item) => {
        // Assuming that item.number is a number you want to sum
        return accumulator + item.number;
    }, 0) : [];


    // Map through the items and calculate the amount for each item
    let totalAmount = 0;
    const items = boughtItemsList ? boughtItemsList.map((item, index) => {
        const amount = item.item.price * item.number;
        totalAmount += amount;
    }) : [];


    const paginatedBoughtItemsList = useSelector(getAllparkPickPaginatedBoughtItemsList)


    const unitList = useSelector(getAllparkUnitList)
    const itemsList = useSelector(getAllparkPickItemsList)
    const [currentPage, setCurrentPage] = useState(1);
    const [startingIndex, setstartingIndex] = useState(0);
    const [startingboughtIndex, setstartingboughtIndex] = useState(0);

    const handlePageChange = (page) => {
        setCurrentPage(page);
        setstartingIndex((page - 1) * 10);
    };
    const handlePagebusinesstransactionChange = (page) => {
        setPagetransaction(page);
        setstartingboughtIndex((page - 1) * 10);
    };
    const paginatedItemsList = useSelector(getAllparkPickPaginatedItems)
    const [loading, setLoading] = useState(false);
    const [isloading, setisLoading] = useState(false);
    const isLoading = useSelector((state) => state.transactions.isLoading);
    //  Item form 
    const [Name, setNameValue] = useState('');
    const [Price, setPriceValue] = useState('');
    const [Availability, setAvailabilityValue] = useState(false);
    const [Category, setCategoryValue] = useState('');
    const [Unity, setUnityValue] = useState();
    const [Preferred, setPreferredValue] = useState(false);
    const [Description, setDescriptionValue] = useState('');

    //  category form 
    const [categoryName, setcategoryNameValue] = useState('');
    //  unit form 
    const [unitName, setUnitNameValue] = useState('');

    // edit state
    const [editUnit, setEditUnit] = useState(false);
    const [editCategory, setEditCategory] = useState(false);
    const [editCategoryData, setEditCategoryDAta] = useState(false);
    const [editUnitData, setEditUnitDAta] = useState(false);
    const [editItemOpen, seteditItemOpen] = useState(false);
    const [editItem, setEditItem] = useState('');


    const handleUnitName = (event) => {
        setUnitNameValue(event.target.value)
    };
    const handlecategoryName = (event) => {
        setcategoryNameValue(event.target.value)
    };
    const handleName = (event) => {
        setNameValue(event.target.value)
    };
    const handlePrice = (event) => {
        setPriceValue(event.target.value)
    };
    const handleAvailability = (event) => {
        const newValue = event.target.value === 'true';
        setAvailabilityValue(newValue);
    };
    const handleCategory = (event) => {
        setCategoryValue(parseInt(event.target.value))
    };
    const handleUnity = (event) => {
        setUnityValue(parseInt(event.target.value))
    };
    const handlePreferred = (event) => {
        const newValue = event.target.value === 'true';
        setPreferredValue(newValue);
    };
    const handleDescription = (event) => {
        setDescriptionValue(event.target.value)
    };

    const modalTitle = 'Create Item';
    const btn_name = "Save";
    const updateTitle = 'Update Item';
    const categoryupdate = 'Update category';
    // catgeory
    const categoryTitle = 'Add  new category';
    const handleChildEvent = () => {
        setOpen(!open);
    };

    const handleChildCatgeoryEvent = () => {
        setcategoryOpen(!category);
    };
    const handleCategoryModal = () => {
        setcategoryOpen(!category);
    };

    // unit
    const unityTitle = 'Add  new unit';
    const handleChildUnitEvent = () => {
        setUnityModalOpen(!unity);
    };
    const handleUnitModal = () => {
        setUnityModalOpen(!unity);
    };
    const handleOpenModal = () => {
        setOpen(!open);
    };

    const handleTabClick = (tabId) => {
        setActiveTab(tabId);
    };


    const updateUnit = async (event) => {
        event.preventDefault();
        const unit = {
            'name': unitName,
        };
        try {
            await axios.patch(`https://api.koipay.co/api/v1/park-pick/units/update/${editUnitData.id}`, unit, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            dispatch(fetchAsynParkUnit())
            addToast(`successful created`, {
                appearance: 'success', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setUnitNameValue('');
            setEditUnit(!editUnit);
        } catch (error) {
            if (error.response.status === 400) {
                // Request was successful
                // let riderErros = Object.keys(error.response.data);
                // ErrorHandler(riderErros);
                addToast('please fill the required field', {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });

            } else {
                addToast(error.response.statusText, {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            }

        }
    }

    const handleUpdateCategory = async (event) => {
        event.preventDefault();
        const category = {
            'name': categoryName,
        };
        try {
            await axios.patch(`https://api.koipay.co/api/v1/park-pick/categories/${editCategoryData.id}`, category, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            dispatch(fetchAsynParkCatgories())
            addToast(`successful created`, {
                appearance: 'success', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setcategoryNameValue('');
            setEditCategory(!editCategory);
        } catch (error) {
            if (error.response.status === 400) {
                // Request was successful
                // let riderErros = Object.keys(error.response.data);
                // ErrorHandler(riderErros);
                addToast('please fill the required field', {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });

            } else {
                addToast(error.response.statusText, {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            }

        }
    }

    const createUnit = async (event) => {
        event.preventDefault();
        const unit = {
            'name': unitName,
        };
        try {
            await axios.post(`https://api.koipay.co/api/v1/park-pick/units/create`, unit, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            dispatch(fetchAsynParkUnit())
            addToast(`successful created`, {
                appearance: 'success', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setUnitNameValue('');
            setUnityModalOpen(!unity);
        } catch (error) {
            if (error.response.status === 400) {
                // Request was successful
                // let riderErros = Object.keys(error.response.data);
                // ErrorHandler(riderErros);
                addToast('please fill the required field', {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });

            } else {
                addToast(error.response.statusText, {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            }

        }
    }

    const handleCreateCategory = async (event) => {
        event.preventDefault();
        const category = {
            'name': categoryName,
        };
        try {
            await axios.post(`https://api.koipay.co/api/v1/park-pick/categories/create`, category, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            dispatch(fetchAsynParkCatgories())
            addToast(`successful created`, {
                appearance: 'success', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setcategoryNameValue('');
            setcategoryOpen(!category);
        } catch (error) {
            if (error.response.status === 400) {
                // Request was successful
                // let riderErros = Object.keys(error.response.data);
                // ErrorHandler(riderErros);
                addToast('please fill the required field', {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });

            } else {
                addToast(error.response.statusText, {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            }

        }
    }
    const handleCreateItem = async (event) => {
        event.preventDefault();

        const item = {
            'name': Name,
            'description': Description,
            'available': Availability,
            'price': Price,
            'categoryId': Category,
            'unitId': Unity,
            'isPreferred': Preferred,
        };

        try {

            await axios.post(`https://api.koipay.co/api/v1/park-pick/items/create`, item, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            dispatch(fetchAsynItems(currentPage))
            addToast(`successful created`, {
                appearance: 'success', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });

            setNameValue('');
            setPriceValue('');
            setAvailabilityValue(false);
            setCategoryValue('');
            setUnityValue('');
            setPreferredValue(false);
            setDescriptionValue('');
            setOpen(!open);
        } catch (error) {
            if (error.response.status === 400) {
                // Request was successful
                // let riderErros = Object.keys(error.response.data);
                // ErrorHandler(riderErros);
                addToast('please fill the required field', {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });

            } else {
                addToast(error.response.statusText, {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            }

        }


    }



    // edit items

    const handleChildEditItemEvent = () => {
        seteditItemOpen(!editItemOpen);
    };

    // handleLogOut
    const handleLogOut = async () => {
        localStorage.removeItem('user');
        window.location.replace('/');
    };
    // edit category

    const handleChildEditCategoryEvent = () => {
        setEditCategory(!editCategory);
    };
    // edit Unit

    const handleChildEditUnitEvent = () => {
        setEditUnit(!editUnit);
    };
    const allbusinesscategories = useSelector(getAllBussinessesCategories);
    const [viewBusinessInfo, setViewBusinessInfo] = useState(false);
    const [editBusiness, seteditBusiness] = useState(false);


    const modalRiderTitle = "Business details";
    const Moridebtn_name = "Name";

    const handleEditChildEvent = () => {
        seteditBusiness(!editBusiness);

    };
    const [businesName, setbusinesNameValue] = useState('');
    const [colorCode, setcolorCodeValue] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [contactTel, setcontactTelValue] = useState('');
    const [isRegistered, setIsregistered] = useState(false);
    const [rewardType, setrewardType] = useState('');
    const [businessCategory, setbusinessCategory] = useState('');
    const [email, setEmail] = useState('');
    const [reward_percentage, setreward_percentage] = useState('');
    // const [password, setpassword] = useState('');
    // const [confirmPassword, setConfirmPassword] = useState('');

    // Define states for profile image and permit image
    const [file, setFile] = useState('');
    const [certificate, setcertificate] = useState('');
    const [certificateImgae, setcertificateImage] = useState('');
    const [certificateFile, setcertificateFile] = useState('');
    const [renderfile, setrenderFile] = useState('');

    // set values
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

    const reward_percentageHandleChange = (event) => {
        setreward_percentage(event.target.value);
    };

    //  image upload

    function handleChange(e) {
        setrenderFile(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    }
    const handleCertificateChange = (e) => {
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
                `https://pay.koipay.co/api/v1/accountholder/information?msisdn=25${phoneNumber}`,
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
    useEffect(() => {
        handleSubmit();
    }, [phoneNumber]);
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

    const [passwordError, setpassword_error] = useState('');


    const handleEditBusiness = (busines) => {
        setViewBusinessInfo(busines);
        seteditBusiness(!editBusiness);
        fillBussinesForm(busines);

    };

    const fillBussinesForm = (busines) => {

        setbusinesNameValue(busines.name);
        setcolorCodeValue(busines.color_code);
        setcontactTelValue(busines.contact_tel);
        setphoneNumber(busines.momo_tel);
        setrewardType(busines.reward_type);
        setreward_percentage(busines.reward_percentage);
        setEmail(busines.user ? busines.user.email : '');
        setcertificate(busines.business_certificate ? busines.business_certificate : '');
        setrenderFile(busines.icon ? busines.icon : '');
        setbusinessCategory(busines.category.id);


    };


    const handleBusinessRegister = async (event) => {

        const businessInform = new FormData();
        businessInform.append('name', businesName);
        businessInform.append('color_code', colorCode);
        businessInform.append('momo_tel', phoneNumber);
        businessInform.append('contact_tel', contactTel);
        businessInform.append('reward_type', rewardType);
        businessInform.append('category', businessCategory);
        businessInform.append('reward_percentage', reward_percentage);
        businessInform.append('email', email);
        businessInform.append('icon', file);
        businessInform.append('business_certificate', certificateFile);

        event.preventDefault();
        const isValidPhoneNumber = validateMtnPhoneNumber(phoneNumber);
        if (!isValidPhoneNumber) {
            // Handle invalid phone number case
            addToast("Something went wrong! please check your momo number", {
                appearance: 'error', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });

            return;
        }

        setisLoading(true)

        try {
            const response = await axios.patch(`https://apidev2.koipay.co/api/business/${user.id}/   
            `, businessInform, {
                // headers: {
                //     'Access-Control-Allow-Origin': '*',
                // }
            });

            addToast('Successfully updated ', {
                appearance: 'success',
            });
            seteditBusiness(!editBusiness);
            dispatch(fetchAsynSingleBusiness({ user }));
            setisLoading(false);
            setbusinesNameValue("");
            setcolorCodeValue("");
            setcontactTelValue("");
            setphoneNumber("");
            setrewardType("");
            setbusinessCategory("");
            setEmail("");

            setreward_percentage("");
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

    useEffect(() => {
        dispatch(fetchAsynBusinessTransactionList({ user, pagetransactions }));
    }, [dispatch, pagetransactions]);

    useEffect(() => {
        dispatch(fetchAsynParkCatgories())
        dispatch(fetchAsynParkUnit());
        dispatch(fetchAsynBusinessReport({ user }));
        dispatch(fetchAsynBusinessTransactionList({ user }));
        dispatch(fetchAsynSingleBusiness({ user }));
        dispatch(fetchAsynBusinessCatgeory())
    }, [dispatch, currentPage]);

    const [filterType, setfilterType] = useState('Weekly');

    const setfilterHandleChange = (event) => {
        setfilterType(event.target.value);
    };

    return (
        <div className='bg-gray-100'>
            <nav class="bg-white border-solid border-b-4 nav-bar border_green-500 z-50">
                <div class=" flex flex-wrap items-center justify-between  px-4 py-2">
                    <img class=" " src={main_logo} alt="user photo" />
                    <div class="flex items-center  bg-white  ">
                        <div className='flex flex-col mx-2' >
                            <span>{user.name}</span>
                            <div class="group flex justify-between items-center relative">
                                <span className='text_red-500' >@ {user.role ? user.role.title : 'N/A'}</span>
                                <button
                                    class="bg-white text-gray-700 font-semibold px-4 rounded inline-flex items-center"
                                >
                                    <span class="mr-1"></span>
                                    <svg
                                        class="fill-current h-4 w-4"
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
                                        />
                                    </svg>
                                </button>
                                <ul class="absolute hidden text-gray-700 pt-16 group-hover:block ">
                                    <li class="px-4 logout-button ">
                                        <a onClick={() => handleLogOut()}
                                            class="rounded-t bg-gray-200 hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap cursor-pointer"
                                        >Log out</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div class="relative">
                            <span className="avatar  flex justify-center items-center p-2 bg-slate-400 text-slate-400">
                                <svg class="absolute w-12 h-8 text-white -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                            </span>
                            <span class="top-0 left-7 absolute  w-5 h-5 bg_red-500 border-2 border-white  rounded-full"></span>
                        </div>
                    </div>

                </div>
            </nav>

            <div className="mb-4 border-b myTabContent border-gray-200">
                <ul className="nav-tab-items flex flex-wrap text-sm font-medium text-center px-16 bg-white " role="tablist">
                    <li className="mx-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-4 rounded-t-lg  ${activeTab === 'summary' ? 'border_green-500' : 'border-transparent hover:border-slate-400'}`}
                            onClick={() => handleTabClick('summary')}
                            role="tab"
                            aria-controls="summary"
                            aria-selected={activeTab === 'summary'}
                        >
                            BUSINESS REPORT
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'payments' ? 'border_green-500' : 'border-transparent hover:border-slate-400'}`}
                            onClick={() => handleTabClick('payments')}
                            role="tab"
                            aria-controls="payments"
                            aria-selected={activeTab === 'payments'}
                        >
                            PAYMENTS
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'profile' ? 'border_green-500' : 'border-transparent hover:border-slate-400'}`}
                            onClick={() => handleTabClick('profile')}
                            role="tab"
                            aria-controls="profile"
                            aria-selected={activeTab === 'profile'}
                        >
                            PROFILE
                        </button>
                    </li>


                </ul>

                <div id="myTabContent" className=' bg-gray-100'  >
                    <div
                        className={`p-4 rounded-lg my_TabContent my_TabContent_mobile bg-gray-100   flex w-full  flex-col items-center justify-center  ${activeTab === 'summary' ? '' : 'hidden'}`}
                        id="summary"
                        role="tabpanel"
                        aria-labelledby="summary-tab"
                    >
                        <div className='bg_red-500  p-3 mb-4 rounded-lg w-full'> <Filter /> </div>

                        {businessReport && <div className='flex w-full' >
                            <div className='flex flex-col bg-white p-3 rounded-lg reward-card ' >
                                <div className='font-bold py-2 ' >Rewards</div>
                                {/* <div className='reward-title' >Total offered cash back</div>
                                <span className='py-2' >200M+</span> */}
                                <div className='reward-title' >Total offered points</div>
                                <span className='py-2' > {businessReport.total_points_offered ? businessReport.total_points_offered.total_points : '0'} </span>
                                <div className='reward-title' >Total points redeemed</div>
                                {businessReport.total_points_redeemed && <span className='py-2' > {businessReport.total_points_redeemed.total_points_redeemed ? businessReport.total_points_redeemed.total_points : '0'} </span>}
                                <div className='reward-title' >Total points unredeemed</div>
                                {businessReport.total_points_unredeemed && <span className='py-2' > {businessReport.total_points_unredeemed ? businessReport.total_points_unredeemed : '0'} </span>}
                                <div className='reward-title' >Total Customers</div>
                                <span className='py-2' > {businessReport.total_clients ? businessReport.total_clients : 'N/A'} </span>

                                <div className='reward-title' >Total Cashback Offered</div>
                                <span className='py-2' > {businessReport.total_cashback_offered ? businessReport.total_cashback_offered : 'N/A'} </span>

                                <div className='reward-title' >Monthly Cashback</div>
                                <span className='py-2' > {businessReport.monthly_cashback ? businessReport.monthly_cashback : 'N/A'} </span>

                                <div className='reward-title' >Weekly Cashback</div>
                                <span className='py-2' > {businessReport.weekly_cashback ? businessReport.weekly_cashback : 'N/A'} </span>
                            </div>
                            <div className='chart-card-sales flex flex-col items-center justify-center  bg-white mx-2 rounded-lg relative '>
                                <div className='font-bold py-2 Customers-title ' >Top Customers  </div>
                                <TopCustomer />
                            </div>
                            <div className='bg-white chart-card flex flex-col p-3 rounded-lg relative'>
                                <div className='font-bold border-b-2    py-2 mb-1' >Report <select required value={filterType} onChange={setfilterHandleChange} className='rounded border' >
                                    <option className='' value='Weekly' >Weekly</option>
                                    <option value='Monthly' >Monthly</option>
                                </select> </div>
                                {filterType === 'Weekly' && <Chart />}
                                {filterType === 'Monthly' && <Monthly />}
                            </div>
                        </div>}
                    </div>
                    <div
                        className={`p-4 rounded-lg my_TabContent my_TabContent_mobile  bg-gray-100  px-20 ${activeTab === 'profile' ? '' : 'hidden'}`}
                        id="profile"
                        role="tabpanel"
                        aria-labelledby="profile-tab"
                    >
                        {singleBusinessdetails && <div className='flex flex-col my-3   form-width bg-white p-8 rounded-lg border '>
                            <div className='flex justify-between business-image mobile-fit w-4/5 ' >
                                <div className='flex flex-col w-full mr-1' >
                                    <label>
                                        Business name
                                    </label>
                                    <span className='capitalize ' > {singleBusinessdetails.name ? singleBusinessdetails.name : "N/A"} </span>
                                    <label className='' >
                                        Color code
                                    </label>
                                    <span>{singleBusinessdetails.color_code ? singleBusinessdetails.color_code : "N/A"}</span>
                                    <span className='flex flex-col' >
                                        <label>
                                            Contact tel
                                        </label>
                                        <span>{singleBusinessdetails.contact_tel ? singleBusinessdetails.contact_tel : "N/A"}</span>
                                    </span>
                                </div>
                                <div className='flex flex-col' >
                                    <label className='mx-2' >
                                        Business Icon
                                    </label>
                                    <div className="upload_container border rounded-lg m-1 ">
                                        {singleBusinessdetails.icon ? <img src={`${singleBusinessdetails.icon}`} alt="Selected Image" className="image" /> : <img src={upload} alt="Selected Image" className="image" />}

                                    </div>
                                </div>

                            </div>



                            <div className='flex justify-between mobile-fit my-2  w-4/5 '>
                                <span className='flex flex-col mobile-fit  my-2 '  >
                                    <label>
                                        MTN MOMO tel
                                    </label>
                                    <span>{singleBusinessdetails.momo_tel ? singleBusinessdetails.momo_tel : "N/A"}</span>

                                </span>


                                <span className='flex flex-col' >
                                    <label>
                                        Business status
                                    </label>
                                    <span className='text-end'>{singleBusinessdetails.status ? singleBusinessdetails.status : "N/A"}</span>
                                </span>
                            </div>

                            <div className='flex justify-between mobile-fit my-2  w-4/5 '>
                                <div className='flex flex-col '  >
                                    <label>
                                        Reward type
                                    </label>
                                    <span >{singleBusinessdetails.reward_type ? singleBusinessdetails.reward_type : "N/A"}</span>

                                </div>


                                <div className='flex flex-col '  >
                                    <label>
                                        Business category
                                    </label>
                                    <span className='text-end'>{singleBusinessdetails.category ? singleBusinessdetails.category.name : "N/A"}</span>
                                </div>
                            </div>
                            <div className='flex justify-between mobile-fit my-2  w-4/5'>
                                <span className='flex flex-col' >
                                    <label>
                                        Reward percentage
                                    </label>
                                    <span  >{singleBusinessdetails.reward_percentage ? singleBusinessdetails.reward_percentage : "N/A"} %</span>
                                </span>
                                <span className='flex flex-col' >
                                    <label>
                                        Email (admin account)
                                    </label>
                                    <span className='text-end' >{singleBusinessdetails.user ? singleBusinessdetails.user.email : "N/A"}</span>
                                </span>

                            </div>

                            <div className='flex justify-between business-image mobile-fit  ' >

                                <div className='flex flex-col w-full' >
                                    <label className='' >
                                        Business certificate
                                    </label>
                                    {singleBusinessdetails.business_certificate && <div className=" certificate-container  p-3 border rounded-lg m-1 ">
                                        {/* {certificateImg && <img src={`${singleBusinessdetails.business_certificate}`} alt="Selected Image" className="image" />} */}

                                        <Document file={`${singleBusinessdetails.business_certificate}`} onLoadSuccess={({ numPages }) => setNumPages(numPages)} style={{ width: '100%', height: '500px' }}>
                                            <Page pageNumber={pageNumber} />
                                        </Document>

                                    </div>}
                                    {!singleBusinessdetails.business_certificate && <div className='flex flex-col' >

                                        <span>No certificate available</span>
                                        {/* <img src={upload} alt="Selected Image" className="image-not-setted" /> */}

                                    </div>}
                                </div>

                            </div>


                            <div className=' flex  items-center justify-center'>
                                <button className='bg_red-500 text-white rounded-md  px-10  py-2 my-3' onClick={() => handleEditBusiness(singleBusinessdetails)} >
                                    update
                                </button>
                            </div>

                            <Modal setOpenModal={editBusiness} onChildEvent={handleEditChildEvent} Title={modalRiderTitle} button={''} >


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
                                            <div className='ml-1 flex' >
                                                {loading && (<div role="status">
                                                    <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                    </svg>
                                                    <span class="sr-only">Loading...</span>
                                                </div>)}
                                                {isRegistered && phoneNumber.length === 10 && <span role="img" aria-label="check mark button" class="react-emojis">✅</span>}
                                                {!isRegistered && phoneNumber.length === 10 && <span role="img" aria-label="cross mark" class="react-emojis">❌</span>}
                                            </div>
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
                                    <div className='flex justify-between business-image mobile-fit  ' >

                                        <div className='flex flex-col' >
                                            <label className='mx-2' >
                                                Business certificate
                                            </label>
                                            <div className="certificate-container p-3 border rounded-lg m-1 ">

                                                {certificate || certificateImgae ? (
                                                    <>
                                                        {certificateImgae && <img src={certificateImgae} alt="Selected Image" className="image-certificate" />}
                                                        {certificate && <Document file={certificate} onLoadSuccess={({ numPages }) => setNumPages(numPages)} style={{ width: '100%', height: '100px' }}>
                                                            <Page pageNumber={pageNumber} />
                                                        </Document>}
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
                                        <button className='fom-btn w-1/3 p-2 my-3' >
                                            {!isloading ? (<div className='mr-4 submit-btn-center' onClick={handleBusinessRegister}  >Save</div>) : (<div role="status">
                                                <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                                </svg>
                                                <span class="sr-only">Loading...</span>
                                            </div>)} </button>

                                    </span>
                                </div>
                            </Modal>

                        </div>}

                    </div>

                    <div
                        className={`p-4 rounded-lg my_TabContent my_TabContent_mobile bg-gray-100  px-20 ${activeTab === 'payments' ? '' : 'hidden'}`}
                        id="payments"
                        role="tabpanel"
                        aria-labelledby="payments-tab"
                    >
                        <div className='bg-white rounded-md py-2' >
                            <div className='bg-white rounded-md py-2' >
                                <button className='bg_red-500 text-white font-bold rounded-lg py-2 px-3 mx-4' >
                                    Business transactions
                                </button>
                                <div className='flex justify-between items-center p-4' >

                                    <div className='flex  filter-section  ' >
                                        <div className='flex flex-col' >
                                            <span className='py-2' >Filter by date :</span>
                                            <div className='flex' >
                                                <DatePicker.RangePicker onChange={handleDateRangeChange} defaultValue={[dayjs(defaultStartDate), dayjs(defaultEndDate)]}
                                                    format="YYYY-MM-DD" />
                                                <div onClick={getDayOfMonth} className={isThisMonth ? 'mx-1 border px-3 py-1 rounded-lg active_filter cursor-pointer' : 'mx-1 border px-3 py-1 rounded-lg cursor-pointer'}  >
                                                    this month
                                                </div>
                                                <div onClick={getDayOfWeek} className={firstDayOfWeek ? 'ml-1 mr-2 border px-3 py-1 rounded-lg active_filter cursor-pointer' : 'ml-1 mr-2 border px-3 py-1 rounded-lg cursor-pointer'}  >
                                                    this week
                                                </div>
                                            </div>
                                        </div>
                                        {/* <div className='flex flex-col' >
                                            <span className='py-2' >Filter by items:</span>

                                            <Select

                                                showSearch
                                                placeholder="Select category"
                                                optionFilterProp="children"
                                                onChange={onItemsChange}
                                                onSearch={onSearch}
                                                filterOption={filterOption}
                                                options={nonPaginatedItemsList}

                                            />

                                        </div> */}
                                        <div className='flex flex-col' >
                                            <span className='py-2' >Filter by status :</span>
                                            <Select

                                                showSearch
                                                placeholder="Select a status"
                                                optionFilterProp="children"
                                                onChange={onStatusChange}
                                                onSearch={onSearch}
                                                filterOption={filterOption}

                                                options={[
                                                    {
                                                        value: '200',
                                                        label: 'SUCCESS',
                                                    },
                                                    {
                                                        value: '201',
                                                        label: 'CREATED',
                                                    },
                                                    {
                                                        value: '202',
                                                        label: 'PENDING',
                                                    },
                                                    {
                                                        value: '500',
                                                        label: 'FAILED',
                                                    },
                                                ]}
                                            />
                                        </div>
                                        {/* <ExcelExport excelData={boughtItemsList} Amount={totalAmount} /> */}
                                    </div>
                                    <div>
                                    </div>
                                </div>
                                <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md ">
                                    <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b dark:bg-gray-100">
                                        <tr>
                                            <th scope="col" className="px-3 py-3">
                                                #
                                            </th>
                                            <th scope="col" className=" py-3">
                                                Internal Txn Id
                                            </th>
                                            <th scope="col" className=" py-3">
                                                name
                                            </th>
                                            <th scope="col" className=" py-3">
                                                phone number
                                            </th>
                                            <th scope="col" className=" py-3">
                                                amount
                                            </th>
                                            <th scope="col" className=" py-3">
                                                Done_at
                                            </th>
                                            <th scope="col" className=" py-3">
                                                status
                                            </th>
                                            <th scope="col" className=" py-3">
                                                action type
                                            </th>
                                            <th scope="col" className=" py-3">
                                                reward/type
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>


                                        {
                                            singleBusinesstrnsactions.length ? (singleBusinesstrnsactions.map((transaction, index) => (
                                                <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600" key={index} >
                                                    <td className="w-4 p-4">

                                                        <span className='px-2' >{transaction.daily_transaction_for_mobile_id ? transaction.daily_transaction_for_mobile_id : "N/A"}</span>
                                                    </td>
                                                    <td className=" py-4">
                                                        {transaction.internalTxnId ? transaction.internalTxnId : "N/A"}
                                                    </td>
                                                    <td className=" py-4">
                                                        {transaction.client ? transaction.client.username : "N/A"}
                                                    </td>
                                                    <td className=" py-4">
                                                        {transaction.client ? transaction.client.phone : "N/A"}
                                                    </td>
                                                    <td className=" py-4">
                                                        {transaction.amount ? transaction.amount : "N/A"}
                                                    </td>
                                                    <td className=" py-4">

                                                        {moment(transaction.created_at).format('YYYY-MM-DD HH:mm:ss')}

                                                    </td>
                                                    <td className="px-6 py-4" >
                                                        {transaction.status === 'FAILED' && <span className="font-medium FAILED">{transaction.status ? transaction.status : "N/A"}</span>}
                                                        {transaction.status === 'SUCCESS' && <span className="font-medium  SUCCESS">{transaction.status ? transaction.status : "N/A"}</span>}
                                                        {transaction.status === 'CREATED' && <span className="font-medium  CREATED">{transaction.status ? transaction.status : "N/A"}</span>}
                                                        {transaction.status === 'PENDING' && <span className="font-medium  PENDING">{transaction.status ? transaction.status : "N/A"}</span>}
                                                    </td>
                                                    <td className="px-6 py-4">

                                                        {transaction.action_type ? transaction.action_type : "N/A"}

                                                    </td>
                                                    <td className="px-6 py-4">

                                                        {transaction.points && <span> {transaction.points ? transaction.points : "N/A"} / points</span>}


                                                    </td>
                                                </tr>
                                            ))) : (
                                                singleBusinesstrnsactions.map((transaction, index) => (
                                                    <tr className="bg-white border-b hover:bg-gray-50 dark:hover:bg-gray-600" key={index} >
                                                        <td className="w-4 p-4">
                                                            <span className='px-2'> {transaction.externalTxnId ? transaction.externalTxnId : "N/A"}</span>
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

                                                            {transaction.status === 'FAILED' && <span className="font-medium FAILED">{transaction.status ? transaction.status : "N/A"}</span>}
                                                            {transaction.status === 'SUCCESS' && <span className="font-medium  SUCCESS">{transaction.status ? transaction.status : "N/A"}</span>}
                                                            {transaction.status === 'CREATED' && <span className="font-medium  CREATED">{transaction.status ? transaction.status : "N/A"}</span>}
                                                            {transaction.status === 'PENDING' && <span className="font-medium  PENDING">{transaction.status ? transaction.status : "N/A"}</span>}
                                                        </td>
                                                    </tr>
                                                ))
                                            )
                                        }
                                    </tbody>
                                    <div className='flex  justify-center items-center spinner-w' >
                                        {isLoading && <div role="status" className='flex justify-center items-center  w-full' >
                                            <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-red-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>}
                                    </div>


                                </table>
                            </div>
                        </div>
                        {singleBusinesstrnsactions.length > 0 && <div className='flex justify-end my-1' >
                            <Pagination defaultCurrent={1} total={paginatedBusinessTransactions.totalCount} onChange={handlePagebusinesstransactionChange} className="border p-3 rounded-lg bg-white" />
                        </div>}
                    </div>
                </div>
            </div>

            <footer class="bg-white  footer   ">
                <div class=" flex flex-wrap items-center justify-between px-4 ">

                    <div className='flex' >
                        <img class=" w-16   h-16 rounded-full object-cover" src={groupeya} alt="user photo" />
                        <strong className="font-medium text-gray-800 pt-7 text-sm ">Powered by Groupeya </strong>
                    </div>

                    <div class="flex items-center  bg-white  ">
                        <div class="relative flex">
                            <Link to='#' className='cursor-pointer  social-media'><FontAwesomeIcon icon={faTwitter} color="#1DA1F2" /></Link>
                            <Link to='#' className='mx-3  cursor-pointer social-media'><FontAwesomeIcon icon={faLinkedin} color="#0077B5" /></Link>
                            <Link to='#' className='cursor-pointer social-media'><FontAwesomeIcon icon={faYoutube} color="#E4405F" /></Link>
                        </div>
                    </div>

                </div>
                <div className='px-20 py-2 bg_red-500' >
                    <span className='text-white text-sm' >All rights reserved</span>
                </div>
            </footer>

        </div>
    )
}

export default ParkPick