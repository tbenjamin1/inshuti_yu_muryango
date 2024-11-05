import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../images/undraw_interview.svg"

import axios from 'axios';
import koipay_logo from "../images/jal_koi.png"
import NewNavBar from './NewNavBar';
import Footer from './Footer';
import { Avatar, Card } from 'antd';
import { EditOutlined, PhoneOutlined, EllipsisOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons';
import { faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHouseChimney, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import home_banner from "../images/home-banner.png"

import { useToasts } from 'react-toast-notifications';


function Login() {

    const { addToast } = useToasts();
    const [email, setEmailValue] = useState('');
    const [password, setPasswordValue] = useState('');
    const [loading, setLoading] = useState(false);
    const emailHandleChange = (event) => {
        setEmailValue(event.target.value);
    };
    const passwordHandleChange = (event) => {
        setPasswordValue(event.target.value);
    };


    const handleSubmit = async (event) => {

        event.preventDefault();

        setLoading(true)

        try {
            const response = await axios.post('https://apidev.koipay.co/api/v1/auth/signin', { email, password }, {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                }
            });

            addToast(`Welcome ${response.data.name}`, { appearance: 'success' });

            // Assuming the server responds with a token upon successful authentication
            const auth_user = response.data;

            // Store the token in local storage
            localStorage.setItem('user', JSON.stringify(auth_user));
            if (auth_user.role.title === "park_and_pick") {
                window.location.replace('/park-pick');
            } else if (auth_user.role.title === "business") {
                window.location.replace('/business-report');
            } else {
                window.location.replace('/statistics');
            }

            // window.location.replace('/park-pick');
            setLoading(false);
            //  redirecting the user to the desired page

        } catch (error) {
            addToast(error.response.data.message, { appearance: 'error' });
            setLoading(false);
        }
    };

    return (
        <div className='flex flex-col' >
            <NewNavBar />
            <div className="flex flex-wrap  w-full register-container container-main" >
                <div
                    className="w-full register_banner relative h-64"
                    style={{
                        backgroundImage: `url(${home_banner})`
                    }}
                >
                    <div className='banner-content flex justify-items-end  h-full text-white ' >
                        <div className='flex flex-col  justify-center space-y-4 p-4'>
                            <div className='font-bold why-content-tile ' >Welcome to JaliKoi </div>
                            <div className='why-content ' >

                            </div>

                        </div>
                    </div>
                </div>

                <div className='flex justify-center items-center w-full  bg-slate-100 p-3 middle-container'  >

                    <div className='flex flex-col justify-around items-start  my-5'>
                        <Card
                            style={{
                                width: 450,

                            }}
                            className='my-3'



                        >
                            <div className="flex justify-center items-center  border-b-2">
                                <a className="cursor-pointer ">
                                    <img
                                        className="h-10 object-cover"
                                        src={koipay_logo}
                                        alt=" jali koi Logo"
                                    />
                                </a>
                            </div>

                            <div className='flex flex-col w-full  ' >
                                <div className='flex flex-col my-3  '>
                                    <span className='flex flex-col my-4' >
                                        <label>
                                            Email
                                        </label>
                                        <input type="text" className='' placeholder='b*****n@gmail.com' value={email} onChange={emailHandleChange} ></input>
                                    </span>
                                    <span className='flex flex-col' >
                                        <label>
                                            Password
                                        </label>
                                        <input type="password" className='' placeholder='Password' value={password} onChange={passwordHandleChange} ></input>
                                    </span>
                                    <span className='flex justify-between items-center py-3  w_full_login ' >
                                        <Link to="/reset"><span className='remeber_forgot underline cursor-pointer'>Forgot password?</span></Link>
                                    </span>
                                    <span className=' '>
                                        <button onClick={handleSubmit} className='flex  justify-center items-center fom-btn w-full p-2'>  {!loading ? (<div className='mr-4' >Login</div>) : (<div role="status">
                                            <svg aria-hidden="true" class="inline w-4 h-4 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-white" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                                            </svg>
                                            <span class="sr-only">Loading...</span>
                                        </div>)}  </button>
                                    </span>
                                </div>
                            </div>

                        </Card>

                    </div>

                </div>

                <Footer />

            </div>

        </div>
       
    )
}

export default Login