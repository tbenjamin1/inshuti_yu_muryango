

import React, { useState, useEffect } from 'react'
import employee from "../../images/employee-referrals.png"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faBackward} from '@fortawesome/free-solid-svg-icons';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

function RegisterEntity() {
    const { addToast } = useToasts();
    const [phoneNumber, setphoneNumber] = useState('');
    const [isRegistered, setIsregistered] = useState(false);
    const [entityName, setEntityName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isloading, setisLoading] = useState(false);
    const entityNameHandleChange = (event) => {
        setEntityName(event.target.value);
    };
   
    const confirmMOMOnumberHandleChange = (event) => {
        setphoneNumber(event.target.value);
        validateMtnPhoneNumber(event.target.value);

    };

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


    const handleRefereeSubmit = async (event) => {
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
        const entity = {
            'name': entityName,
            'phone_number': phoneNumber,
        }

        try {
            const response = await axios.post('https://api.koipay.co/api/v1/entities',entity, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });
            addToast(`An Entity was successfully created, your entity is : ${response.data.entities.name}`, {
                appearance: 'success',
            });
            setisLoading(false);
            setEntityName("");
            setphoneNumber("");
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
    return (
        <div className='flex bg-slate-100 py-20  main-refree-container px-10' >
             <Link to="/"> <span className='remeber_forgot underline cursor-pointer top-2 mx-3 absolute '><FontAwesomeIcon icon={faBackward} color="#13b9668DA1F2"  className='mx-3'/>Back</span> </Link>
                <div className='banner-background w-1/2  px-2 '>
                    <span className='flex flex-col  ' >
                        <img src={employee} className="App-logo" alt="logo" />
                        <span className=' referee-emoji' role="img" aria-label="partying-face">🥳</span>
                        <span className='my-3 ml-4 font_serif referal-content' >Empower your cause like never before by joining our platform. Unlock the potential of cashback rewards as a source of generous donations from our network and supporters passionate about your mission. <strong>Why Register with Us?</strong>Expand  Your Reach: Connect with individuals who genuinely care about your cause.Receive Direct Support: Tap into a unique source of funding from cashback rewards !</span>
                    </span>
                </div>
                <div className='flex flex-col w-1/2 justify-center items-center bg-white py-4 referee-form '>
                    <span className='Referral-title flex flex-col    font_serif   '>
                        <span className='pl-2'>Register Your Charity and Fuel Your Mission!</span>
                       
                    </span>
                    <span className='login-sub-title p-2' ></span>
                    <span className='login-sub-title my-3'>------ Register your Entity --------</span>
                    <div className='flex flex-col  my-3  w-3/5 form-width'>
                        <span className='flex flex-col my-4' >
                            <label>
                            Entity  Name
                            </label>
                            <input type="text" className='' placeholder='  Name' value={entityName} onChange={entityNameHandleChange}  ></input>
                        </span>
                        
                        <span className='flex flex-col' >
                            <label>
                                MTN MOMO Number
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
                        </span>
                        
                        <span className=' w_full flex justify-between items-center py-3 '>
                            <span className='remeber_forgot flex justify-between items-center'>All filled are required !</span>
                            <Link to="/"> <span className='remeber_forgot underline cursor-pointer '>Back</span> </Link>
                        </span>
                        <span className=' '>
                            <button className='fom-btn w-full p-2' onClick={handleRefereeSubmit} >
                                {!isloading ? (<div className='mr-4' >Submit</div>) : (<div role="status">
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

export default RegisterEntity