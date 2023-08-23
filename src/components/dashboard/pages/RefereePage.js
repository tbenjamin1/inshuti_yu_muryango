

import React, { useState } from 'react'
import employee from "../../images/employee-referrals.png"
import { Link } from 'react-router-dom'
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';

function RefereePage() {
    const { addToast } = useToasts();
    const [email, setEmailValue] = useState('');
    const [password, setPasswordValue] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [error, setError] = useState('');
    const [isRegistered, setIsregistered] = useState(false);
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [displayName, setdisplayName] = useState('');
    const [loading, setLoading] = useState(false);
    const [isloading, setisLoading] = useState(false);
    const firstNameHandleChange = (event) => {
        setfirstName(event.target.value);
    };
    const lastNameHandleChange = (event) => {
        setlastName(event.target.value);
    };
    const displayNameHandleChange = (event) => {
        setdisplayName(event.target.value);
    };
    const confirmMOMOnumberHandleChange = (event) => {
        setphoneNumber(event.target.value)
        setLoading(true);
        handleSubmit();
    }
    const handleSubmit = async () => {
        let userPhone =JSON.stringify( {
            "msisdn": "250785141480"
          });
          console.log('userPhone', userPhone);
          
          if (phoneNumber.length >= 9) {
            setLoading(true);
            try {
                const response = await axios({
                    method: 'get',
                    url: 'https://pay.koipay.co/api/v1/accountholder/information',
                    headers: {
                      'Content-Type': 'application/json',
                      Authorization: `Bearer ${process.env.REACT_APP_TOKEN_REFEREE}`,
                    },
                    data:userPhone, // Include data in the request body
                  });
              addToast(`congratulations !! successfully registered`, { appearance: 'success' });
              
              setIsregistered(true);
              setLoading(false);
              //  redirecting the user to the desired page
            } catch (error) {
              addToast(error.response.data.message, { appearance: 'error' });
              setIsregistered(false);
              setLoading(false);
            }
          }
          
    }
    const handleRefereeSubmit = async (event) => {
        event.preventDefault();
        setisLoading(true)
        let referee_info = {
            "firstName": firstName,
            "lastName": lastName,
            "phoneNumber": phoneNumber,
            "displayName": displayName,
        }
        try {
            const response = await axios.post('https://api.koipay.co/api/v1/referees', { firstName,lastName,phoneNumber,displayName }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });
            addToast(`Welcome ${response.data.message}`, { appearance: 'success' });
            setisLoading(false);
            //  redirecting the user to the desired page
        } catch (error) {
            addToast(error.response.data.message, { appearance: 'error' });
            setisLoading(false);
        }
    };
    return (
        <div className='flex justify-center items-center border login-screen' >
            <div className='flex justify-center items-center bg-white login-page '>
                <div className='referee_height  px-2  flex justify-center items-center'>
                    <span className='flex flex-col justify-center items-center ' >
                        <img src={employee} className="App-logo" alt="logo" />
                        <span className=' referee-emoji' role="img" aria-label="partying-face">🥳</span>
                        <span className='my-3 ml-4 font-serif referal-content' >Refer, Earn, and Give Back with Koipay! Invite your friends to join Koipay and earn cash back every time they use our platform. Support charities close to your heart by donating your cash back rewards</span>
                    </span>
                </div>
                <div className='flex flex-col  login_form'>
                    <span className='Referral-title flex flex-col justify-center items-center    font-serif   '>
                        <span>Join Koipay's Referral Program and Multiply Your Rewards!</span>
                        <span> Every time your friends use Koipay</span>
                    </span>
                    <span className='login-sub-title p-2' ></span>
                    <span className='login-sub-title my-3'>------ Join Koipay's Referral --------</span>
                    <div className='flex flex-col my-3  w-3/5'>
                        <span className='flex flex-col my-4' >
                            <label>
                                First Name
                            </label>
                            <input type="text" className='' placeholder=' First Name' value={firstName} onChange={firstNameHandleChange}  ></input>
                        </span>
                        <span className='flex flex-col' >
                            <label>
                                Last Name
                            </label>
                            <input type="text" className='' placeholder=' Last Name' value={lastName} onChange={lastNameHandleChange}></input>
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
                                    {isRegistered && <span role="img" aria-label="check mark button" class="react-emojis">✅</span>}
                                    {!isRegistered && loading && <span role="img" aria-label="cross mark" class="react-emojis">❌</span>}
                                </div>
                            </span>
                        </span>
                        <span className='flex flex-col' >
                            <label>
                                Display Name
                            </label>
                            <input type="text" className='' placeholder='Display Name' value={displayName} onChange={displayNameHandleChange} ></input>
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

        </div>
    )
}

export default RefereePage