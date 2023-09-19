import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import main_logo from "../../../images/park.jpeg";
import groupeya from "../../../images/Groupeya_logo .png";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from "react-redux"
import { faTwitter, faLinkedin, faYoutube } from '@fortawesome/free-brands-svg-icons';
import Modal from './Modal';
import axios from 'axios';
import moment from 'moment';
import { Pagination } from 'antd';
import { useToasts } from 'react-toast-notifications';
import { fetchAsynItems, fetchAsynParkCatgories, fetchAsynParkUnit, getAllparkCategories, getAllparkPickItemsList, getAllparkPickPaginatedItems, getAllparkUnitList, getUser } from '../../../../redux/transactions/TransactionSlice';

const ParkPick = () => {
    const user = useSelector(getUser);
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const [activeTab, setActiveTab] = useState('item');
    const [open, setOpen] = useState(false);
    const [category, setcategoryOpen] = useState(false);
    const [unity, setUnityModalOpen] = useState(false);
    const categoriesList = useSelector(getAllparkCategories);

    const unitList = useSelector(getAllparkUnitList)
    const itemsList = useSelector(getAllparkPickItemsList)
    const [currentPage, setCurrentPage] = useState(1);
    const handlePageChange = (page) => {
        setCurrentPage(page);
      };
    const paginatedItemsList = useSelector(getAllparkPickPaginatedItems)

    const isLoading = useSelector((state) => state.transactions.isLoading);
    //  Item form 
    const [Name, setNameValue] = useState('');
    const [Price, setPriceValue] = useState('');
    const [Availability, setAvailabilityValue] = useState(false);
    const [Category, setCategoryValue] = useState('');
    const [Unity, setUnityValue] = useState('');
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
        setUnityValue(event.target.value)
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
            await axios.patch(`https://apidev.koipay.co/api/v1/park-pick/units/update/${editUnitData.id}`, unit, {
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
            if (error.response.status == 400) {
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
            await axios.patch(`https://apidev.koipay.co/api/v1/park-pick/categories/${editCategoryData.id}`, category, {
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
            if (error.response.status == 400) {
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
            await axios.post(`https://apidev.koipay.co/api/v1/park-pick/units/create`, unit, {
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
            if (error.response.status == 400) {
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
            await axios.post(`https://apidev.koipay.co/api/v1/park-pick/categories/create`, category, {
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
            if (error.response.status == 400) {
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

            await axios.post(`https://apidev.koipay.co/api/v1/park-pick/items/create`, item, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            dispatch(fetchAsynItems())
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
            if (error.response.status == 400) {
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

    // handle Delete unit
    const handleDeleteUnit = async (item) => {
        const confirmed = window.confirm('Are you sure you want to delete this unit ?');
        if (confirmed) {

            try {
                await axios.delete(`https://apidev.koipay.co/api/v1/park-pick/units/delete/${item.id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                });
                dispatch(fetchAsynParkUnit())
                addToast(`deleted`, {
                    appearance: 'success', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            } catch (error) {
                addToast(error.response.statusText, {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            }
        }
    }
    // handle Delete Category
    const handleDeleteCategory = async (category) => {
        const confirmed = window.confirm('Are you sure you want to delete this category ?');
        if (confirmed) {

            try {
                await axios.delete(`https://apidev.koipay.co/api/v1/park-pick/categories/${category.id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                });
                dispatch(fetchAsynParkCatgories())
                addToast(`deleted`, {
                    appearance: 'success', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            } catch (error) {
                addToast(error.response.statusText, {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            }
        }
    }
    // edit unit
    const handleEditUnit = async (item) => {
        setEditUnit(!editUnit);
        setEditUnitDAta(item);
        fillEditUnitForm(item);
    }
    // edit category
    const handleEditCategory = async (item) => {
        setEditCategory(!editCategory);
        setEditCategoryDAta(item);
        fillEditCategoryForm(item);
    }
    // delete item
    const handleDeleteItem = async (item) => {
        const confirmed = window.confirm('Are you sure you want to delete this item?');
        if (confirmed) {

            try {
                await axios.delete(`https://apidev.koipay.co/api/v1/park-pick/items/delete-item/${item.id}/`, {
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                });
                dispatch(fetchAsynItems())
                addToast(`deleted`, {
                    appearance: 'success', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            } catch (error) {
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

    // edit category

    const handleChildEditCategoryEvent = () => {
        setEditCategory(!editCategory);
    };
    // edit Unit

    const handleChildEditUnitEvent = () => {
        setEditUnit(!editUnit);
    };

    const handleEditItem = async (item) => {
        seteditItemOpen(!editItemOpen);
        setEditItem(item)
        fillEditForm(item)

    }
    // fill  fill Unit Form
    const fillEditUnitForm = (item) => {
        setUnitNameValue(item.name);
    }
    // fill category fillEditUnitForm
    const fillEditCategoryForm = (item) => {
        setcategoryNameValue(item.name);
    }
    const fillEditForm = (item) => {
        setNameValue(item.name);
        setPriceValue(item.price);
        setAvailabilityValue(item.available);
        setCategoryValue(item.category.id);
        setUnityValue(item.unit.id);
        setPreferredValue(item.isPreferred);
        setDescriptionValue(item.description);
    }
    const handleUpdateItem = async (event) => {
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
            await axios.patch(`https://apidev.koipay.co/api/v1/park-pick/items/update-item/${editItem.id}`, item, {
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
            });
            dispatch(fetchAsynItems())
            addToast(`successful updated`, {
                appearance: 'success', autoDismiss: true,
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
            seteditItemOpen(!editItemOpen);
        } catch (error) {
            if (error.response.status == 400) {
                // Request was successful
                addToast('please fill the required field', {
                    appearance: 'error', autoDismiss: true,
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });

            } else {
                addToast(error.response.statusText, {
                    appearance: 'error', autoDismiss: true,
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });
            }

        }

    }

    useEffect(() => {
        dispatch(fetchAsynParkCatgories())
        dispatch(fetchAsynParkUnit())
        dispatch(fetchAsynItems())
    }, [dispatch]);

    return (
        <div className='bg-gray-100  '>
            <nav class="bg-white border-solid border-b-4 nav-bar border-red-500">
                <div class=" flex flex-wrap items-center justify-between  px-4 py-2">
                    <a href="#" class="flex items-center">
                        <img class=" w-16   h-16 rounded-full object-cover" src={main_logo} alt="user photo" />
                    </a>
                    <div class="flex items-center  bg-white  ">

                        <div className='flex flex-col mx-2' >
                            <span>{user.name} </span>
                            <div class="group flex justify-between items-center relative">
                                <span className='text-red-500' >@ {user.role.title}</span>
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
                                        <a
                                            class="rounded-t bg-gray-200 hover:bg-gray-200 py-2 px-4 block whitespace-no-wrap"
                                            href="/"
                                        >Log out</a>
                                    </li>

                                </ul>
                            </div>
                        </div>
                        <div class="relative">
                            <span className="avatar  flex justify-center items-center p-2 bg-slate-400 text-slate-400">
                                <svg class="absolute w-12 h-8 text-white -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                            </span>
                            <span class="top-0 left-7 absolute  w-5 h-5 bg-red-500 border-2 border-white  rounded-full"></span>
                        </div>
                    </div>

                </div>
            </nav>

            <div className="mb-4 border-b myTabContent border-gray-200  ">
                <ul className="flex flex-wrap text-sm font-medium text-center px-16 bg-white " role="tablist">
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'item' ? 'border-red-500' : 'border-transparent hover:border-slate-400'}`}
                            onClick={() => handleTabClick('item')}
                            role="tab"
                            aria-controls="item"
                            aria-selected={activeTab === 'item'}
                        >
                            ITEM
                        </button>
                    </li>
                    <li className="mr-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'category' ? 'border-red-500' : 'border-transparent hover:border-slate-400'}`}
                            onClick={() => handleTabClick('category')}
                            role="tab"
                            aria-controls="category"
                            aria-selected={activeTab === 'category'}
                        >
                            CATEGORY
                        </button>
                    </li>

                    <li role="presentation">
                        <button
                            className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'unity' ? 'border-red-500' : 'border-transparent hover:border-slate-400'}`}
                            onClick={() => handleTabClick('unity')}
                            role="tab"
                            aria-controls="unity"
                            aria-selected={activeTab === 'unity'}
                        >
                            UNIT
                        </button>
                    </li>
                    <li role="presentation">
                        <button
                            className={`inline-block p-4 border-b-4 rounded-t-lg ${activeTab === 'payments' ? 'border-red-500' : 'border-transparent hover:border-slate-400'}`}
                            onClick={() => handleTabClick('payments')}
                            role="tab"
                            aria-controls="payments"
                            aria-selected={activeTab === 'payments'}
                        >
                            PAYMENTS
                        </button>
                    </li>
                    <li className="mx-2" role="presentation">
                        <button
                            className={`inline-block p-4 border-b-4 rounded-t-lg  ${activeTab === 'summary' ? 'border-red-500' : 'border-transparent hover:border-slate-400'}`}
                            onClick={() => handleTabClick('summary')}
                            role="tab"
                            aria-controls="summary"
                            aria-selected={activeTab === 'summary'}
                        >
                            SUMMARY
                        </button>
                    </li>
                </ul>

                <div id="myTabContent" className='  bg-gray-100 ' >

                    <div
                        className={`p-4 rounded-lg my_TabContent bg-gray-100  px-20  ${activeTab === 'summary' ? '' : 'hidden'}`}
                        id="summary"
                        role="tabpanel"
                        aria-labelledby="summary-tab"
                    >
                        <strong className="font-medium text-gray-800 bg-white py-5 px-20 rounded-lg ">summary comming soon !  </strong>
                    </div>


                    <div
                        className={`p-4 my_TabContent rounded-lg bg-gray-100   px-20 ${activeTab === 'category' ? '' : 'hidden'}`}
                        id="category"
                        role="tabpanel"
                        aria-labelledby="category-tab"
                    >


                        <div className='bg-white rounded-md py-2' >
                            <div className='flex justify-between items-center p-4' >
                                <div>
                                    Categories
                                </div>
                                <div className='flex justify-center items-center ' >
                                    {isLoading && <div role="status" className='flex justify-center items-center  w-full' >
                                        <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-red-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>}
                                </div>
                                <div>
                                    <button onClick={handleCategoryModal} className='bg-red-500 text-white font-bold rounded-lg py-2 px-3' >
                                        Add Category
                                    </button>
                                    <Modal setOpenModal={editCategory} onChildEvent={handleChildEditCategoryEvent} Title={categoryupdate} button={btn_name}  >
                                        <div className="flex flex-col justify-center m-12 " >
                                            <div className='flex justify-between ' >
                                                <label className="block  w-4/5   ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Category Name </span>
                                                    <input type="text" className="border-gray-300 " placeholder='Category Name ' value={categoryName} onChange={handlecategoryName} />
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">
                                            {production_year}
                                        </p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between my-3' >
                                                <button className='bg-red-500 text-white px-10 py-1 rounded-md cursor-pointer' onClick={handleUpdateCategory} >Update</button>
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal setOpenModal={category} onChildEvent={handleChildCatgeoryEvent} Title={categoryTitle} button={btn_name}  >
                                        <div className="flex flex-col justify-center m-12 " >
                                            <div className='flex justify-between ' >
                                                <label className="block  w-4/5   ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Category Name </span>
                                                    <input type="text" className="border-gray-300 " placeholder='Category Name ' value={categoryName} onChange={handlecategoryName} />
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">
                                            {production_year}
                                        </p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between my-3' >
                                                <button className='bg-red-500 text-white px-10 py-1 rounded-md cursor-pointer' onClick={handleCreateCategory} >Create</button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>

                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md ">
                                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b dark:bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            created_at
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            updated_at
                                        </th>
                                        {/* <th scope="col" className="px-6 py-3">
                                            deleted_at
                                        </th> */}
                                        <th scope="col" className="px-6 py-3">
                                            actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    {categoriesList.length && (categoriesList.map((item, index) => (
                                        <tr className="bg-white border-b dark:hover:bg-gray-300 dark:hover:text-black" key={index} >
                                            <td className="w-4 p-4">
                                                {item.id}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {moment(item.createdAt).format('LLLL')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(item.updatedAt).format('LLLL')}
                                            </td>

                                            {/* <td className="px-6 py-4">
                                                {item.deletedAt ? item.deletedAt : "N/A"}
                                            </td> */}

                                            <td className='px-6 py-4 flex justify-between' >
                                                <FontAwesomeIcon icon={faEdit} size="1x" className='cursor-pointer ' onClick={() => handleEditCategory(item)} />
                                                <FontAwesomeIcon icon={faTrash} size="1x" className='cursor-pointer text-red-500 ' onClick={() => handleDeleteCategory(item)} />
                                            </td>
                                        </tr>
                                    )))
                                    }

                                </tbody>
                            </table>
                        </div>




                    </div>

                    <div
                        className={`p-4 rounded-lg my_TabContent bg-gray-100  px-20 ${activeTab === 'item' ? '' : 'hidden'}`}
                        id="item"
                        role="tabpanel"
                        aria-labelledby="item-tab"
                    >


                        <div className='bg-white rounded-md py-2' >
                            <div className='flex justify-between items-center p-4' >
                                <div>
                                    Items
                                </div>
                                <div className='flex justify-center items-center ' >
                                    {isLoading && <div role="status" className='flex justify-center items-center  w-full' >
                                        <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-red-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>}
                                </div>
                                <div>
                                    <button onClick={handleOpenModal} className='bg-red-500 text-white font-bold rounded-lg py-2 px-3' >
                                        Add New Item
                                    </button>

                                    <Modal setOpenModal={editItemOpen} onChildEvent={handleChildEditItemEvent} Title={updateTitle} button={btn_name}  >
                                        <div className="flex flex-col justify-center mt-12 " >

                                            <div className='flex justify-between ' >
                                                <label className="block  w-1/2  mr-3  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Name </span>
                                                    <input type="text" className="border-gray-300 " placeholder=' Item Name' value={Name} onChange={handleName} />
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">{production_year}</p>} */}
                                                </label>
                                                <label className="block   w-1/2  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2 ">Price</span>
                                                    <input type="text" className="border-gray-300" placeholder='Price ' value={Price} onChange={handlePrice} />
                                                    {/* {plate_number && <p className=" mt-2 text-pink-600 text-sm">{plate_number}</p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between ' >
                                                <label className="block  w-1/2  mr-3  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Availability</span>
                                                    <select className=' border border-gray-300 rounded-md h-3/5' value={Availability} onChange={handleAvailability}  >
                                                        <option>pick one</option>
                                                        <option value={true}>yes</option>
                                                        <option value={false}>No</option>
                                                    </select>
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">{production_year}</p>} */}
                                                </label>
                                                <label className="block   w-1/2  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2 ">Category</span>
                                                    <select className=' border border-gray-300 rounded-md h-3/5' value={Category} onChange={handleCategory}  >
                                                        <option>pick one</option>
                                                        {categoriesList.length && categoriesList.map((category) => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                    {/* {plate_number && <p className=" mt-2 text-pink-600 text-sm">{plate_number}</p>} */}
                                                </label>

                                            </div>
                                            <div className='flex justify-between ' >
                                                <label className="block  w-1/2  mr-3  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Unity </span>
                                                    <select className=' border border-gray-300 rounded-md h-3/5' value={Unity} onChange={handleUnity}  >
                                                        <option value="true">pick one</option>
                                                        {unitList.length && unitList.map((unit) => (
                                                            <option key={unit.id} value={unit.id}>{unit.name}</option>
                                                        ))}
                                                    </select>
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">{production_year}</p>} */}
                                                </label>
                                                <label className="block  w-1/2    ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Preferred </span>
                                                    <select className=' border border-gray-300 rounded-md h-1/2' value={Preferred} onChange={handlePreferred}  >
                                                        <option>pick one</option>
                                                        <option value="true">yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">{production_year}</p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between ' >
                                                <label className="block  w-full ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Description</span>
                                                    <textarea type="text" className="border-gray-300 p-2 rounded-md " placeholder='Description' value={Description} onChange={handleDescription} />
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">{production_year}</p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between my-3' >
                                                <button className='bg-red-500 text-white px-10 py-1 rounded-md cursor-pointer' onClick={handleUpdateItem}  >update</button>
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal setOpenModal={open} onChildEvent={handleChildEvent} Title={modalTitle} button={btn_name}  >
                                        <div className="flex flex-col justify-center mt-12 " >

                                            <div className='flex justify-between ' >
                                                <label className="block  w-1/2  mr-3  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Name </span>
                                                    <input type="text" className="border-gray-300 " placeholder=' Item Name' value={Name} onChange={handleName} />
                                                    {/* {production_year && <p className="  text-pink-600 text-sm"> {production_year} </p>} */}
                                                </label>
                                                <label className="block   w-1/2  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2 ">Price</span>
                                                    <input type="text" className="border-gray-300" placeholder='Price ' value={Price} onChange={handlePrice} />
                                                    {/* {plate_number && <p className=" mt-2 text-pink-600 text-sm">{plate_number} </p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between ' >
                                                <label className="block  w-1/2  mr-3  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Availability</span>
                                                    <select className=' border border-gray-300 rounded-md h-3/5' value={Availability} onChange={handleAvailability}  >
                                                        <option >pick one</option>
                                                        <option value="true">yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                    {/* {production_year && <p className="  text-pink-600 text-sm"> {production_year} </p>} */}
                                                </label>
                                                <label className="block   w-1/2  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2 ">Category</span>
                                                    <select className=' border border-gray-300 rounded-md h-3/5' value={Category} onChange={handleCategory}  >
                                                        <option value="true">pick one</option>
                                                        {categoriesList.length && categoriesList.map((category) => (
                                                            <option key={category.id} value={category.id}>{category.name}</option>
                                                        ))}
                                                    </select>
                                                    {/* {plate_number && <p className=" mt-2 text-pink-600 text-sm">{plate_number</p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between ' >
                                                <label className="block  w-1/2  mr-3  ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Unity </span>
                                                    <select className=' border border-gray-300 rounded-md h-3/5' value={Unity} onChange={handleUnity}  >
                                                        <option value="true">pick one</option>
                                                        {unitList.length && unitList.map((unit) => (
                                                            <option key={unit.id} value={unit.id}>{unit.name}</option>
                                                        ))}
                                                    </select>
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">{production_year}</p>} */}
                                                </label>

                                                <label className="block  w-1/2    ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Preferred </span>
                                                    <select className=' border border-gray-300 rounded-md h-1/2' value={Preferred} onChange={handlePreferred}  >
                                                        <option >pick one</option>
                                                        <option value="true">yes</option>
                                                        <option value="false">No</option>
                                                    </select>
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">{production_year} </p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between ' >
                                                <label className="block  w-full ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Description</span>
                                                    <textarea type="text" className="border-gray-300 p-2 rounded-md " placeholder='Description' value={Description} onChange={handleDescription} />
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">{production_year}</p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between my-3' >
                                                <button className='bg-red-500 text-white px-10 py-1 rounded-md cursor-pointer' onClick={handleCreateItem}  >Create</button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>
                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md ">
                                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b dark:bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            price/unit
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            unit
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Availability
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            Preferred
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className='' >

                                    {itemsList.length && (itemsList.map((item, index) => (
                                        <tr className="bg-white border-b dark:hover:bg-gray-300 dark:hover:text-black" key={index} >
                                            <td className="w-4 p-4">
                                                {item.id}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {item.category.name}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.price} /FRW
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.unit.name}
                                            </td>

                                            <td className="px-6 py-4">
                                                {item.available === true ? "Available" : "Not available"}
                                            </td>
                                            <td className="px-6 py-4">
                                                {item.isPreferred === true ? "Preferred" : "Not Preferred"}
                                            </td>

                                            <td className='px-6 py-4 flex justify-between' >
                                                <FontAwesomeIcon icon={faEdit} size="1x" className='cursor-pointer ' onClick={() => handleEditItem(item)} />
                                                <FontAwesomeIcon icon={faTrash} size="1x" className='cursor-pointer text-red-500 ' onClick={() => handleDeleteItem(item)} />
                                            </td>
                                        </tr>


                                    )))
                                    }
                                </tbody>
                            </table>


                        </div>
                        <div className='flex justify-end my-1' >
                            <Pagination defaultCurrent={10} total={paginatedItemsList.totalCount} onChange={handlePageChange} className="border p-3 rounded-lg bg-white" />
                        </div>
                    </div>

                    <div
                        className={`p-4 rounded-lg my_TabContent bg-gray-100  px-20 ${activeTab === 'unity' ? '' : 'hidden'}`}
                        id="unity"
                        role="tabpanel"
                        aria-labelledby="unity-tab"
                    >
                        <div className='bg-white rounded-md py-2' >
                            <div className='flex justify-between items-center p-4' >
                                <div>
                                    unit
                                </div>
                                <div className='flex justify-center items-center ' >
                                    {isLoading && <div role="status" className='flex justify-center items-center  w-full' >
                                        <svg aria-hidden="true" class="inline w-6 h-6 mr-2 text-gray-200 animate-spin dark:text-red-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                        </svg>
                                        <span class="sr-only">Loading...</span>
                                    </div>}
                                </div>
                                <div>
                                    <button onClick={handleUnitModal} className='bg-red-500 text-white font-bold rounded-lg py-2 px-3' >
                                        Add new unit
                                    </button>
                                    <Modal setOpenModal={unity} onChildEvent={handleChildUnitEvent} Title={unityTitle} button={btn_name}  >
                                        <div className="flex flex-col justify-center m-12 " >
                                            <div className='flex justify-between ' >
                                                <label className="block  w-4/5   ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Unit Name </span>
                                                    <input type="text" className="border-gray-300 " placeholder='Unit Name ' value={unitName} onChange={handleUnitName} />
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">
                                            {production_year}
                                        </p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between my-3' >
                                                <button className='bg-red-500 text-white px-10 py-1 rounded-md cursor-pointer' onClick={createUnit} >Create</button>
                                            </div>
                                        </div>
                                    </Modal>
                                    <Modal setOpenModal={editUnit} onChildEvent={handleChildEditUnitEvent} Title={"Update unit"} button={btn_name}  >
                                        <div className="flex flex-col justify-center m-12 " >
                                            <div className='flex justify-between ' >
                                                <label className="block  w-4/5   ">
                                                    <span className="block text-sm font-medium text-slate-700 py-2">Unit Name </span>
                                                    <input type="text" className="border-gray-300 " placeholder='Unit Name ' value={unitName} onChange={handleUnitName} />
                                                    {/* {production_year && <p className="  text-pink-600 text-sm">{production_year}</p>} */}
                                                </label>
                                            </div>
                                            <div className='flex justify-between my-3' >
                                                <button className='bg-red-500 text-white px-10 py-1 rounded-md cursor-pointer' onClick={updateUnit} >update</button>
                                            </div>
                                        </div>
                                    </Modal>
                                </div>

                            </div>
                            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md ">
                                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b dark:bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            created_at
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            updated_at
                                        </th>
                                        {/* <th scope="col" className="px-6 py-3">
                                            deleted_at
                                        </th> */}
                                        <th scope="col" className="px-6 py-3">
                                            actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {unitList.length && (unitList.map((item, index) => (
                                        <tr className="bg-white border-b dark:hover:bg-gray-300 dark:hover:text-black" key={index} >
                                            <td className="w-4 p-4">
                                                {item.id}
                                            </td>
                                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                                {item.name}
                                            </th>
                                            <td className="px-6 py-4">
                                                {moment(item.createdAt).format('LLLL')}
                                            </td>
                                            <td className="px-6 py-4">
                                                {moment(item.updatedAt).format('LLLL')}
                                            </td>

                                            {/* <td className="px-6 py-4">
                                                {item.deletedAt ? item.deletedAt : "N/A"}
                                            </td> */}

                                            <td className='px-6 py-4 flex justify-between' >
                                                <FontAwesomeIcon icon={faEdit} size="1x" className='cursor-pointer ' onClick={() => handleEditUnit(item)} />
                                                <FontAwesomeIcon icon={faTrash} size="1x" className='cursor-pointer text-red-500 ' onClick={() => handleDeleteUnit(item)} />
                                            </td>
                                        </tr>


                                    )))
                                    }

                                </tbody>
                            </table>
                        </div>

                    </div>

                    <div
                        className={`p-4 rounded-lg my_TabContent bg-gray-100  px-20 ${activeTab === 'payments' ? '' : 'hidden'}`}
                        id="payments"
                        role="tabpanel"
                        aria-labelledby="payments-tab"
                    >
                        <div className='bg-white rounded-md py-2' >
                            <div className='flex justify-between items-center p-4' >
                                <div>
                                    Payments comming soon !
                                </div>
                                <div>
                                    {/* <button onClick={handleOpenModal} className='bg-red-500 text-white font-bold rounded-lg py-2 px-3' >
                                        Add Item
                                    </button> */}

                                </div>

                            </div>
                            {/* <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400 rounded-md ">
                                <thead className="text-xs text-gray-700 uppercase dark:text-gray-400 border-b dark:bg-gray-100">
                                    <tr>
                                        <th scope="col" className="px-6 py-3">
                                            #
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            name
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            category
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            price/unit
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            unit
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            status
                                        </th>
                                        <th scope="col" className="px-6 py-3">
                                            actions
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-white border-b dark:hover:bg-gray-300 dark:hover:text-black"  >
                                        <td className="w-4 p-4">
                                            120v
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            green vegetable
                                        </th>
                                        <td className="px-6 py-4">
                                            vegetable
                                        </td>
                                        <td className="px-6 py-4">
                                            1000FRW
                                        </td>
                                        <td className="px-6 py-4">
                                            1 bunch
                                        </td>

                                        <td className="px-6 py-4">
                                            available
                                        </td>

                                        <td className='px-6 py-4 flex justify-between' >
                                            <FontAwesomeIcon icon={faEdit} size="1x" className='cursor-pointer ' />
                                            <FontAwesomeIcon icon={faTrash} size="1x" className='cursor-pointer text-red-500 ' />
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:hover:bg-gray-300 dark:hover:text-black"  >
                                        <td className="w-4 p-4">
                                            120v
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            green vegetable
                                        </th>
                                        <td className="px-6 py-4">
                                            vegetable
                                        </td>
                                        <td className="px-6 py-4">
                                            1000FRW
                                        </td>
                                        <td className="px-6 py-4">
                                            1 bunch
                                        </td>

                                        <td className="px-6 py-4">
                                            available
                                        </td>

                                        <td className='px-6 py-4 flex justify-between' >
                                            <FontAwesomeIcon icon={faEdit} size="1x" className='cursor-pointer ' />
                                            <FontAwesomeIcon icon={faTrash} size="1x" className='cursor-pointer text-red-500 ' />
                                        </td>
                                    </tr>
                                    <tr className="bg-white border-b dark:hover:bg-gray-300 dark:hover:text-black"  >
                                        <td className="w-4 p-4">
                                            120v
                                        </td>
                                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap ">
                                            green vegetable
                                        </th>
                                        <td className="px-6 py-4">
                                            vegetable
                                        </td>
                                        <td className="px-6 py-4">
                                            1000FRW
                                        </td>
                                        <td className="px-6 py-4">
                                            1 bunch
                                        </td>

                                        <td className="px-6 py-4">
                                            available
                                        </td>

                                        <td className='px-6 py-4 flex justify-between' >
                                            <FontAwesomeIcon icon={faEdit} size="1x" className='cursor-pointer ' />
                                            <FontAwesomeIcon icon={faTrash} size="1x" className='cursor-pointer text-red-500 ' />
                                        </td>
                                    </tr>
                                </tbody>
                            </table> */}
                        </div>
                    </div>
                </div>
            </div>

            <footer class="bg-white  footer   ">
                <div class=" flex flex-wrap items-center justify-between px-4 py-2">
                    <a href="#" class="flex items-center">
                        <img class=" w-16   h-16 rounded-full object-cover" src={groupeya} alt="user photo" />
                        <strong className="font-medium text-gray-800 pt-7 text-sm ">Powered by Groupeya </strong>
                    </a>
                    <div class="flex items-center  bg-white  ">
                        <div class="relative flex">
                            <Link to='#' className='cursor-pointer  social-media'><FontAwesomeIcon icon={faTwitter} color="#1DA1F2" /></Link>
                            <Link to='#' className='mx-3  cursor-pointer social-media'><FontAwesomeIcon icon={faLinkedin} color="#0077B5" /></Link>
                            <Link to='#' className='cursor-pointer social-media'><FontAwesomeIcon icon={faYoutube} color="#E4405F" /></Link>
                        </div>
                    </div>

                </div>
                <div className='px-20 py-2 bg-red-500' >
                    <span className='text-white text-sm' >All rights reserved</span>
                </div>
            </footer>

        </div>
    )
}

export default ParkPick