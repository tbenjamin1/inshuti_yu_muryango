

import React, { useState, useEffect } from 'react'
import employee from "../../images/employee-referrals.png"
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faBackward } from '@fortawesome/free-solid-svg-icons';
import undraw_interview from "../../images/undraw_logistics.svg"
import axios from 'axios';
import { FaBeer } from 'react-icons/fa';
import upload from "../../images/upload.svg";
import { useDispatch, useSelector } from 'react-redux';
import Select from 'react-select';
import { fetchAsynBusinessCatgeory, getAllBussinessesCategories, selectAcceptTerms, setAcceptTermsConditions } from '../../../redux/transactions/TransactionSlice';
import { MdCategory } from 'react-icons/md';

function RefereePage() {
    const { addToast } = useToasts();
    const dispatch = useDispatch();

    const allbusinesscategories = useSelector(getAllBussinessesCategories);

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

    const [loading, setLoading] = useState(false);
    const [isloading, setisLoading] = useState(false);
    const [termsCondidtions, settermsCondidtions] = useState(false);
    const [termsError, settermsError] = useState(false);
    const [selectedPlate, setSelectedplate] = useState('');
    const acceptTermsState = useSelector(selectAcceptTerms);


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
    const [passwordError, setpassword_error] = useState('');


    const termsHandleChange = (event) => {
        dispatch(setAcceptTermsConditions(!acceptTermsState));
        settermsCondidtions(!termsCondidtions);
    };

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

    const confirmPasswordHandleChange = (event) => {
        setConfirmPassword(event.target.value);
    };

    const handleSelectPlate = (option) => {
        setSelectedplate(option);
    };
    // Define states for profile image and permit image
    const [file, setFile] = useState('');
    const [certificate, setcertificate] = useState('');
    const [certificateFile, setcertificateFile] = useState('');
    const [renderfile, setrenderFile] = useState('');
    // Profile image upload
    function handleChange(e) {
        setrenderFile(URL.createObjectURL(e.target.files[0]));

        setFile(e.target.files[0]);
    }
    const handleCertificateChange = (e) => {
        setcertificate(URL.createObjectURL(e.target.files[0]));
        setcertificateFile(e.target.files[0]);
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
                        Authorization: `Bearer ${process.env.REACT_APP_TOKEN_REFEREE}`,
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

    useEffect(() => {
        console.log("useEffect")
        dispatch(fetchAsynBusinessCatgeory())
    }, []);


    const handleBusinessRegister = async (event) => {
        event.preventDefault();

        seterror_name('');
        setcolor_code('');
        setcontact_tel('');
        setreward_type('');
        setemailError('');
        seticonError('');
        setbusiness_certificate('');
        setpassword_error('');
        setmomo_tel('');

        const businessInform = new FormData();

        businessInform.append('name', businesName);
        businessInform.append('color_code', colorCode);
        businessInform.append('momo_tel', phoneNumber);
        businessInform.append('contact_tel', contactTel);
        businessInform.append('reward_type', rewardType);
        businessInform.append('category', 1);
        businessInform.append('email', email);
        businessInform.append('password', password);
        businessInform.append('icon', file);
        businessInform.append('business_certificate', certificateFile);

        // const isValidPhoneNumber = validateMtnPhoneNumber(phoneNumber);
        // if (!isValidPhoneNumber) {
        //     addToast("Something went wrong! please check your momo number", {
        //         appearance: 'error', autoDismiss: true, // Enable auto dismissal
        //         autoDismissTimeout: 5000,
        //         transitionDuration: 300,
        //     });

        //     return;
        // }
        // if (password.toLowerCase != confirmPassword.toLowerCase) {
        //     addToast("Something went wrong! password must be matching !", {
        //         appearance: 'error', autoDismiss: true, // Enable auto dismissal
        //         autoDismissTimeout: 5000,
        //         transitionDuration: 300,
        //     });

        //     return;
        // }
        // if (!acceptTermsState) {
        //     settermsError(!termsError)
        //     addToast("please confirm you have  read terms and conditions!", {
        //         appearance: 'error', autoDismiss: true, // Enable auto dismissal
        //         autoDismissTimeout: 5000,
        //         transitionDuration: 300,
        //     });

        //     return;
        // }



        setisLoading(true)

        try {
            const response = await axios.post('https://apidev2.koipay.co/api/business/', businessInform, {
                // headers: {
                //     'Access-Control-Allow-Origin': '*',
                // }
            });

            addToast(`Successfully registered`, {
                appearance: 'success',
            });

            setisLoading(false);
            setbusinesNameValue("");
            setcolorCodeValue("");
            setcontactTelValue("");
            setphoneNumber("");
            setrewardType("");
            setbusinessCategory("");
            setEmail("");
            setpassword("");
            setConfirmPassword("");
            setIsregistered(false);
        } catch (error) {

            let riderErros = Object.keys(error.response.data);
            ErrorHandler(riderErros);

            addToast("Something went wrong! please try again", {
                appearance: 'error', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setisLoading(false);
        }
    };
    const ErrorHandler = (fields) => {
        fields.map((field) => {
            if (field === "name") {
                seterror_name("This field may not be blank.");
            }
            if (field === "color_code") {
                setcolor_code("This field may not be blank.");
            }
            if (field === "contact_tel") {
                setcontact_tel("Date has wrong format.YYYY-MM-DD.");
            }
            if (field === "reward_type") {
                setreward_type("select a valid choice .");
            }
            if (field === "category") {
                setcategory("select a valid choice .");
            }
            if (field === "email") {
                setemailError("This field may not be blank.");
            }
            if (field === "icon") {
                seticonError("This field may not be blank.");
            }
            if (field === "business_certificate") {
                setbusiness_certificate("This field may not be blank.");
            }
            if (field === "password") {
                setpassword_error("This field may not be blank.");
            }
            if (field === "momo_tel") {

                setmomo_tel("This field may not be blank.");
            } else {
                return true;
            }
        });
    }

    return (
        <div className='flex bg-slate-100 py-20   px-10 busines-container' >
            <Link to="/"> <span className='remeber_forgot underline cursor-pointer top-2 mx-3 absolute '><FontAwesomeIcon icon={faBackward} color="#13b9668DA1F2" className='mx-3' />Back</span> </Link>
            <div className='bg-white rounded-lg flex justify-center items-center w-1/2  p-2 busines-container-left '>
                <span className='flex flex-col  ' >
                    <img src={undraw_interview} className="App-logo" alt="logo" />
                    <span className=' referee-emoji' role="img" aria-label="partying-face">🥳</span>
                    <span className='my-3 ml-4 font-serif referal-content' >Refer, Earn, and Give Back with Koipay! Invite your friends to
                        join Koipay and earn cash back every time they use our platform. Support charities close to your heart by donating your cash back rewards</span>
                </span>
            </div>
            <div className='flex flex-col w-1/2 justify-center items-center bg-white py-4 referee-form  busines-container-right '>
                <span className='Referral-title flex flex-col    font-serif   '>
                    <span className='pl-2' >Join Koipay's Referral Program and Multiply Your Rewards!</span>

                </span>
                <span className='login-sub-title p-2' ></span>
                <span className='login-sub-title my-3'>------ Join Koipay's Referral --------</span>

                <div className='flex flex-col my-3  w-3/5 form-width'>
                    <div className='flex justify-between business-image mobile-fit  ' >
                        <div className='flex flex-col w-full mr-1' >
                            <label>
                                Business name
                            </label>
                            <input type="text" className='' placeholder=' Business name' value={businesName} onChange={businesNameHandleChange}  ></input>

                            {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}

                            <label className='' >
                                Color code
                            </label>
                            <input type="text" className='' placeholder=' Color code' value={colorCode} onChange={colorCodeHandleChange}  ></input>
                            {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
                            <span className='flex flex-col' >
                                <label>
                                    Contact tel
                                </label>
                                <input type="text" className='' placeholder=' contact tel' value={contactTel} onChange={contactTelHandleChange}></input>
                                {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
                            </span>
                        </div>
                        <div className='flex flex-col' >
                            <label className='mx-2' >
                                Business Icon
                            </label>
                            {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
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
                            <input type="number" className='phone-number' placeholder='Phone Number' value={phoneNumber} onChange={confirmMOMOnumberHandleChange} ></input>
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
                        {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
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
                            {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
                        </div>

                        <div className='flex flex-col w-1/2 mx-2'  >
                            <label>
                                Business category
                            </label>
                            <select required value={businessCategory} onChange={businessCategoryHandleChange} className='rounded border'  >
                                <option value=''  >pick one</option>
                                {allbusinesscategories &&
                                    allbusinesscategories.map((category) => (
                                        <option key={category.id} value={category.name}>
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                            {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
                        </div>
                    </div>
                    <div className='flex justify-between business-image mobile-fit  ' >
                        <div className='flex flex-col w-full mr-1' >
                            <span className='flex flex-col' >
                                <label>
                                    Email (admin account)
                                </label>
                                <input type="text" className='' placeholder=' contact tel' value={email} onChange={emailHandleChange}></input>
                                {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
                            </span>
                            <span className='flex flex-col' >
                                <label>
                                    Password
                                </label>
                                <input type="text" className='' placeholder=' contact tel' value={password} onChange={passwordHandleChange}></input>
                                {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
                            </span>
                            <span className='flex flex-col' >
                                <label>
                                    Confirm password
                                </label>
                                <input type="text" className='' placeholder=' contact tel' value={confirmPassword} onChange={confirmPasswordHandleChange}></input>
                                {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
                            </span>
                        </div>
                        <div className='flex flex-col' >
                            <label className='mx-2' >
                                Business certificate
                            </label>
                            {businesNameError&&<p class="mt-2   text-pink-600 text-sm">
                               {businesNameError}
                            </p>}
                            <div className="upload_container border rounded-lg m-1 ">

                                {certificate ? (
                                    <>
                                        <img src={certificate} alt="Selected Image" className="image" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleCertificateChange}
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
                                            onChange={handleCertificateChange}
                                            className="input-hidden"
                                        />
                                    </>
                                )}
                            </div>
                        </div>

                    </div>

                    <div className='  flex justify-between items-center py-3  mobile-fit '>
                        <div className='flex justify-start items-center   w-4/5'> <input className='checkbox border cursor-pointer' type="checkbox" checked={acceptTermsState} value='yes' onChange={termsHandleChange} /> <Link to="/terms-conditions"> <span className={acceptTermsState === false ? 'mx-2 termsError underline cursor-pointer' : 'mx-2 remeber_forgot underline cursor-pointer'} >terms and conditions {termsError} </span> </Link> </div>
                        <Link to="/"> <span className='remeber_forgot underline cursor-pointer '>Back</span> </Link>
                    </div>
                    <span className=' '>
                        <button className='fom-btn w-full p-2' onClick={handleBusinessRegister} >
                            {!isloading ? (<div className='mr-4 submit-btn-center' >Submit</div>) : (<div role="status">
                                <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                    <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                </svg>
                                <span class="sr-only">Loading...</span>
                            </div>)} </button>
                    </span>
                </div>

            </div>


        </div>
    )
}

export default RefereePage