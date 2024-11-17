

import React, { useState, useEffect } from 'react'
import employee from "../../images/employee-referrals.png"
import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBackward } from '@fortawesome/free-solid-svg-icons';
import { useToasts } from 'react-toast-notifications';
import axios from 'axios';
import NewNavBar from '../../auth/NewNavBar';
import Footer from '../../auth/Footer';
import home_banner from "../../images/home-banner.png"
import { Avatar, Card } from 'antd';
import { EditOutlined, PhoneOutlined, EllipsisOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons';
import { faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHouseChimney, faLocationDot } from '@fortawesome/free-solid-svg-icons'

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

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${import.meta.env.IDENTIFICATION_TOKEN_CHECK}`
        };

        try {
            // const response = await axios.get(
            //     `https://pay.koipay.co/api/v1/accountholder/information?msisdn=25${phoneNumber}`,
            //     {
            //         headers: {
            //             'Content-Type': 'application/json',
            //             Authorization: `Bearer ${import.meta.env.VITE_TOKEN_REFEREE}`,
            //         },
            //     }
            // );

            // console.log('import.meta.env.VITE_TOKEN_REFEREE', import.meta.env.VITE_TOKEN_REFEREE)

            const response = await axios.get(
                'https://payment.jalikoi.rw/api/v1/accountholder/identification',
                {
                    headers,
                    params: { msisdn: `25${phoneNumber}` }
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
                appearance: 'error', autoDismiss: true, 
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setIsregistered(false);
            setLoading(false);
        }
    };
    useEffect(() => {
        // handleSubmit();
    }, [phoneNumber]);


    const handleRefereeSubmit = async (event) => {
        event.preventDefault();
        // const isValidPhoneNumber = validateMtnPhoneNumber(phoneNumber);

        // if (!isValidPhoneNumber) {
        //     addToast("Something went wrong! please check your momo number", {
        //         appearance: 'error', autoDismiss: true, // Enable auto dismissal
        //         autoDismissTimeout: 5000,
        //         transitionDuration: 300,
        //     });

        //     return;
        // }
        setisLoading(true)
        const entity = {
            'name': entityName,
            'phone_number': phoneNumber,
        }

        try {
            const response = await axios.post('https://api.koipay.co/api/v1/entities', entity, {
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
            addToast(error.response.data.message, {
                appearance: 'error', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });
            setisLoading(false);
        }
    };
    return (
        <div className='flex flex-col' >
            <NewNavBar />
            <div className="flex flex-wrap  w-full register-container  container-main" >
                <div
                    className="w-full register_banner relative h-64"
                    style={{
                        backgroundImage: `url(${home_banner})`
                    }}
                >
                    <div className='banner-content flex justify-items-end  h-full text-white ' >
                        <div className='flex flex-col  justify-center space-y-4 p-4'>
                            <div className='font-bold why-content-tile ' >Welcome to JaliKoi Charitable Registration</div>
                            <div className='why-content ' >
                                Join the JaliKoi community and unlock a new way for businesses and individuals to support your mission through cashback donations. <br />
                                 With JaliKoi, charitable organizations can easily connect with businesses and customers who are eager to make a difference.  <br />
                                 Every transaction becomes an opportunity for impact, as users can choose to donate their cashback rewards directly to your cause.
                            </div>

                        </div>
                    </div>
                </div>

                <div className='flex justify-between items-start w-full  bg-slate-100 p-3 middle-container entity-register-container '  >

                    <div className='flex flex-col justify-around items-start middle-container-left  '>
                        <Card
                            style={{
                               

                            }}
                            className='my-3'
                            title="WHY JOIN JALIKOI?" bordered={false}


                        >

                            <div className='flex flex-col ' >
                                <h3 className='my-card-sub-title py-3' >Attract Supporters Effortlessly</h3>
                                <p className='description' >
                                     Reach a larger community of businesses and customers looking to give back.
                                </p>
                                <h3 className='my-card-sub-title py-3' >Seamless Donations</h3>
                                <p className='description' >
                                     Businesses can contribute from their sales, and customers can donate cashback rewards to support your mission.
                                </p>
                                <h3 className='my-card-sub-title py-3' > Expand Your Impact</h3>
                                <p className='description' >
                                   Increase your organization’s visibility while transforming everyday purchases into powerful acts of generosity.
                                </p>
                            </div>

                        </Card>
                        <Card
                            style={{
                               


                            }}

                            title="HOW IT WORKS"
                            bordered={false}


                        >

                            <div className='flex flex-col ' >
                                <h3 className='my-card-sub-title py-3' >Register Your Organization</h3>
                                <p className='description' >
                                     Join our network to be visible to JaliKoi’s community of charitable businesses and customers.

                                </p>
                                <h3 className='my-card-sub-title py-3' >Receive Cashback Donations</h3>
                                <p className='description' >
                                     As users shop and earn cashback, they can choose to donate directly to your cause with just one click.
                                </p>
                                <h3 className='my-card-sub-title py-3' > Build Your Support Community</h3>
                                <p className='description' >
                                    Strengthen your mission with a growing base of supporters from every transaction
                                </p>
                            </div>

                        </Card>
                    </div>
                    <div className='flex   justify-center items-center w-full  middle-container-left  '>
                        {/* <div className='bg-white flex justify-between items-center w-full rounded-md p-2' >
                            <div className='flex address-input lex address-input justify-center items-center   '  >
                                <div className='flex  justify-center items-center ' >
                                    <div className='flex address-form-icon justify-center items-center  ' >
                                        <PhoneOutlined style={{ color: 'white' }} />
                                    </div>
                                </div>

                                <div className='flex flex-col justify-between items-start mx-2  w-full' >
                                    <label>Phone</label>
                                  
                                </div>
                                <div className=' border separator mx-2'></div>

                            </div>
                            <div className='flex address-input justify-center items-center   ' >
                                <div className='flex  justify-center items-center ' >
                                    <div className='flex address-form-icon justify-center items-center  ' >
                                        <FontAwesomeIcon icon={faEnvelope} style={{ color: 'white' }} />
                                    </div>
                                </div>

                                <div className='flex flex-col justify-between items-start mx-2 w-full' >
                                    <label>Email</label>
                                    
                                </div>

                                <div className='h-full border separator mx-2'></div>
                            </div>
                            <div className='flex address-input lex address-input justify-center items-center  ' >
                                <div className='flex  justify-center items-center ' >
                                    <div className='flex address-form-icon justify-center items-center  ' >
                                        <FontAwesomeIcon icon={faHouseChimney} style={{ color: 'white' }} />
                                    </div>
                                </div>

                                <div className='flex flex-col justify-between items-start mx-2 w-full' >
                                    <label>Business name</label>
                                    
                                </div>


                            </div>
                        </div> */}
                        <div className='bg-white w-1/2 flex justify-center items-center mt-3 rounded-md px-8 py-2 entity-register-container ' >
                            <div className='flex flex-col w-full py-20   px-10' >
                               
                                    
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
                                                    {/* {isRegistered && phoneNumber.length === 10 && <span role="img" aria-label="check mark button" class="react-emojis">✅</span>}
                                                    {!isRegistered && phoneNumber.length === 10 && <span role="img" aria-label="cross mark" class="react-emojis">❌</span>} */}
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
                </div>

                <Footer />

            </div>

        </div>
    
    )
}

export default RegisterEntity