

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
// import { Document, Page, pdfjs } from 'react-pdf';
import { fetchAsynBusinessCatgeory, getAllBussinessesCategories, selectAcceptTerms, setAcceptTermsConditions } from '../../../redux/transactions/TransactionSlice';
import NewNavBar from '../../auth/NewNavBar';
import Footer from '../../auth/Footer';
import { Avatar, Card } from 'antd';
import { EditOutlined, PhoneOutlined, EllipsisOutlined, SendOutlined, SettingOutlined } from '@ant-design/icons';
import { faTwitter, faInstagram, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { faEnvelope, faHouseChimney, faLocationDot } from '@fortawesome/free-solid-svg-icons'
import home_banner from "../../images/home-banner.png"

// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function RefereePage() {
    const apiUrlApidev = import.meta.env.VITE_API_URL_APIDEV;

    const { addToast } = useToasts();
    const dispatch = useDispatch();

    const allbusinesscategories = useSelector(getAllBussinessesCategories);
    const [registered, setregistered] = useState(false);

    const [businesName, setbusinesNameValue] = useState('');
    const [colorCode, setcolorCodeValue] = useState('');
    const [phoneNumber, setphoneNumber] = useState('');
    const [contactTel, setcontactTelValue] = useState('');
    const [isRegistered, setIsregistered] = useState(false);
    const [rewardType, setrewardType] = useState('');
    const [businessCategory, setbusinessCategory] = useState('');
    const [email, setEmail] = useState('');
    const [password, setpassword] = useState('');
    const [reward_percentage, setreward_percentage] = useState('');
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
    const [reward_percentageError, setreward_percentageError] = useState('');

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

    const reward_percentageHandleChange = (event) => {
        setreward_percentage(event.target.value);
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
    const handleChange = (e) => {
        setrenderFile(URL.createObjectURL(e.target.files[0]));
        setFile(e.target.files[0]);
    };
    const handleCertificateChange = (e) => {
        const selectedFile = e.target.files[0];
        if (selectedFile) {
            if (selectedFile.type.startsWith('image/')) {
                // It's an image
                setcertificate(URL.createObjectURL(selectedFile));
                setcertificateFile(selectedFile);
            } else if (selectedFile.type === 'application/pdf') {
                setcertificate("https://cdn4.iconfinder.com/data/icons/files-and-folders-2-2/512/77-1024.png");

                setcertificateFile(selectedFile);
            } else {
                addToast("Unsupported file type! please try again", {
                    appearance: 'error', autoDismiss: true, // Enable auto dismissal
                    autoDismissTimeout: 5000,
                    transitionDuration: 300,
                });

            }
        }
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
                `https://payment.jalikoi.rw/api/v1/accountholder/information?msisdn=25${phoneNumber}`,
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
        // handleSubmit();
    }, [phoneNumber]);

    useEffect(() => {
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
        businessInform.append('category', businessCategory);
        businessInform.append('reward_percentage', reward_percentage);
        businessInform.append('email', email);
        businessInform.append('password', password);
        businessInform.append('icon', file);
        businessInform.append('business_certificate', certificateFile);
        const isValidPhoneNumber = validateMtnPhoneNumber(phoneNumber);

        // if (!isValidPhoneNumber) {
        //     addToast("Something went wrong! please check your momo number", {
        //         appearance: 'error', autoDismiss: true, 
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



        if (!acceptTermsState) {
            settermsError(!termsError)
            addToast("please confirm you have  read terms and conditions!", {
                appearance: 'error', autoDismiss: true, // Enable auto dismissal
                autoDismissTimeout: 5000,
                transitionDuration: 300,
            });

            return;
        }
        setisLoading(true)

        try {

            const response = await axios.post(`${apiUrlApidev}/business/create/`, businessInform, {
                // headers: {
                //     'Access-Control-Allow-Origin': '*',
                // }
            });

            setregistered(!registered)
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
            setIsregistered(false);

        } catch (error) {

            let riderErros = Object.keys(error.response.data);
            ErrorHandler(riderErros);

            addToast(error.response.data.message, {
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
            if (field === "reward_percentage") {
                setreward_percentageError("This field may not be blank.");
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
        <>
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
                                <div className='font-bold why-content-tile ' >Welcome to JaliKoi Business Registration</div>
                                <div className='why-content ' >
                                    Unlock the power of cashback rewards today  to boost your business’s sales and create lasting customer loyalty. <br />
                                    Join JaliKoi today and transform the way you connect with customers! Our platform lets you seamlessly, <br />
                                    Manage cashback rewards, offering a smart way to keep customers coming back while increasing their purchasing.
                                </div>

                            </div>
                        </div>
                    </div>

                    <div className='flex justify-between items-start w-full border bg-slate-100 p-3 middle-container entity-register-container'  >

                        <div className='flex flex-col justify-around items-start middle-container-left '>
                            <Card
                                style={{
                                    

                                }}
                                className='my-3'
                                title="WHY JOIN JALIKOI?" bordered={false}


                            >

                                <div className='flex flex-col ' >
                                    <h3 className='my-card-sub-title py-3' >Drive Sales Growth</h3>
                                    <p className='description' >
                                        Reward your customers for every purchase they make, encouraging higher spending and return visits.
                                    </p>
                                    <h3 className='my-card-sub-title py-3' >Build Stronger Loyalty</h3>
                                    <p className='description' >
                                        Give your customers a reason to choose you every time with cashback that adds real value to their experience.
                                    </p>
                                    <h3 className='my-card-sub-title py-3' >Effortless Reward Management</h3>
                                    <p className='description' >
                                        Our user-friendly dashboard makes it easy to track and manage your cash back offerings and customer engagement.
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
                                    <h3 className='my-card-sub-title py-3' >Register Your Business</h3>
                                    <p className='description' >
                                        Create a profile and instantly access our cashback management tools and be visible to our big community of jalikoi App users.
                                    </p>
                                    <h3 className='my-card-sub-title py-3' >Set Custom Cashback Offers</h3>
                                    <p className='description' >
                                        Tailor your rewards to maximize customer satisfaction and encourage repeat business.
                                    </p>
                                    <h3 className='my-card-sub-title py-3' >Watch Sales and Loyalty Grow</h3>
                                    <p className='description' >
                                        With our analytics and reporting, you’ll see the impact of cashback rewards on your bottom line.
                                    </p>
                                </div>

                            </Card>
                        </div>
                        <div className='flex flex-col   justify-start items-center middle-container-left w-full m-3 rounded-md'>
                            <div className='bg-white flex justify-between items-center w-full rounded-md p-2 entity-register-container' >
                                <div className='flex  address-input justify-center items-center    '  >
                                    <div className='flex  justify-center items-center ' >
                                        <div className='flex address-form-icon justify-center items-center  ' >
                                            <PhoneOutlined style={{ color: 'white' }} />
                                        </div>
                                    </div>

                                    <div className='flex flex-col justify-between items-start mx-2  w-full' >
                                        <label>Phone</label>
                                        <input type="text" className='w-full' placeholder=' contact tel' value={contactTel} onChange={contactTelHandleChange}></input>
                                        {phoneNumberError && <p class="mt-2   text-pink-600 text-sm">
                                            {phoneNumberError}
                                        </p>}
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
                                        <input type="text" className='w-full' placeholder='Email' value={email} onChange={emailHandleChange}></input>
                                        {emailError && <p class="mt-2   text-pink-600 text-sm">
                                            {emailError}
                                        </p>}
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
                                        <input type="text" className='w-full' placeholder=' Business name' value={businesName} onChange={businesNameHandleChange}  ></input>

                                        {businesNameError && <p class="mt-2   text-pink-600 text-sm">
                                            {businesNameError}
                                        </p>}
                                    </div>


                                </div>
                            </div>
                            <div className='bg-white w-full mt-3 rounded-md px-8 py-2 ' >
                                {!registered && <div className='flex flex-col my-3  w-3/5 form-width'>
                                    <div className='flex justify-between business-image mobile-fit  ' >
                                        <div className='flex flex-col w-full mr-1' >

                                            <label className='' >
                                                Color code
                                            </label>
                                            <input type="text" className='' placeholder=' Color code' value={colorCode} onChange={colorCodeHandleChange}  ></input>
                                            {colorCodeError && <p class="mt-2   text-pink-600 text-sm">
                                                {colorCodeError}
                                            </p>}
                                            {/* <span className='flex flex-col' >
                                                <label>
                                                    Contact tel
                                                </label>
                                                <input type="text" className='' placeholder=' contact tel' value={contactTel} onChange={contactTelHandleChange}></input>
                                                {phoneNumberError && <p class="mt-2   text-pink-600 text-sm">
                                                    {phoneNumberError}
                                                </p>}
                                            </span> */}
                                            <div className='flex flex-col  mx-2'  >
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
                                                {businessCategoryError && <p class="mt-2   text-pink-600 text-sm">
                                                    {businessCategoryError}
                                                </p>}
                                            </div>
                                        </div>
                                        <div className='flex flex-col' >
                                            <label className='mx-2' >
                                                Business Icon
                                            </label>
                                            {iconError && <p class="mt-2   text-pink-600 text-sm">
                                                {iconError}
                                            </p>}
                                            <div className="upload_container border rounded-lg m-1 ">

                                                {renderfile ? (
                                                    <>
                                                        <img src={renderfile} alt="Selected Image" className="image" />
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={(e) => handleChange(e)}

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
                                                            onChange={(e) => handleChange(e)}

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
                                        {momo_tel && <p class="mt-2   text-pink-600 text-sm">
                                            {momo_tel}
                                        </p>}
                                    </span>

                                    <div className='flex justify-between mobile-fit '>
                                        <div className='flex flex-col w-full'  >
                                            <label>
                                                Reward type
                                            </label>
                                            <select required value={rewardType} onChange={setrewardTypeHandleChange} className='rounded border'  >
                                                <option value='' >pick one</option>
                                                <option value='cashback'>cashback</option>
                                                <option value='points'>points</option>
                                            </select>
                                            {reward_type && <p class="mt-2   text-pink-600 text-sm">
                                                {reward_type}
                                            </p>}
                                        </div>

                                        
                                    </div>
                                    <div className='flex justify-between business-image mobile-fit  ' >
                                        <div className='flex flex-col w-full mr-1' >
                                            <span className='flex flex-col' >
                                                <label>
                                                    Reward percentage
                                                </label>
                                                <input type="text" className='' placeholder='Reward percentage' value={reward_percentage} onChange={reward_percentageHandleChange}></input>
                                                {reward_percentageError && <p class="mt-2   text-pink-600 text-sm">
                                                    {reward_percentageError}
                                                </p>}
                                            </span>

                                            <span className='flex flex-col' >
                                                <label>
                                                    Password
                                                </label>
                                                <input type="password" className='' placeholder='Password' value={password} onChange={passwordHandleChange}></input>
                                                {passwordError && <p class="mt-2   text-pink-600 text-sm">
                                                    {passwordError}
                                                </p>}
                                            </span>

                                        </div>
                                        <div className='flex flex-col' >
                                            <label className='mx-2' >
                                                Business certificate
                                            </label>
                                            {business_certificate && <p class="mt-2   text-pink-600 text-sm">
                                                {business_certificate}
                                            </p>}
                                            <div className="upload_container border rounded-lg m-1 ">

                                                {certificate ? (
                                                    <>
                                                        <img src={certificate} alt="Selected Image" className="image" />

                                                        <input
                                                            type="file"
                                                            accept="application/pdf,image/*"
                                                            onChange={(e) => handleCertificateChange(e)}
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
                                                            onChange={(e) => handleCertificateChange(e)}
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
                                </div>}{registered && <div className='border p-4  flex justify-center items-center  flex-col    font_serif  h-full m-3 rounded-lg success-card' >

                                    <div className='py-4 capitalize'  >
                                        thank you,
                                    </div>
                                    <div className='px-5 text-center ' >
                                        Your account is under review you will be contacted by email on the way forward
                                    </div>

                                </div>}
                            </div>
                        </div>
                    </div>

                    <Footer />

                </div>

            </div>
            {/* <div className='flex bg-slate-100 py-20   px-10 busines-container' >

            <Link to="/"> <span className='remeber_forgot underline cursor-pointer top-2 mx-3 absolute '><FontAwesomeIcon icon={faBackward} color="#123419BDA1F2" className='mx-3' />Back</span> </Link>
            <div className='bg-white rounded-lg flex justify-center items-center w-1/2  p-2 busines-container-left '>
                <span className='flex flex-col  ' >
                    <img src={undraw_interview} className="App-logo" alt="logo" />
                    <span className=' referee-emoji' role="img" aria-label="partying-face">🥳</span>
                    <div className='my-3 ml-4 font_serif referal-content  flex flex-col justify-center items-center ' >
                        <span className=' flex flex-col justify-center items-center' >Getting Started is a Breeze <br></br> <strong>Sign Up:</strong>
                        </span>
                        Quick and easy registration to get you started
                        <span><strong>Customize Rewards:</strong> Choose rewards that fit your business and brand</span>
                        <span><strong>Drive Sales, Build Loyalty:</strong>  Activate your rewards and watch your business grow</span>
                        <span> <strong>See Your Success:</strong> Check out your dashboard to see the impact of your rewards</span>
                    </div>
                </span>
            </div>
            <div className='flex flex-col w-1/2 justify-center items-center bg-white py-4 referee-form  busines-container-right  '>
                <span className='Referral-title flex flex-col    font_serif   '>
                    <span className='pl-2' > Power Up Your Business with Rewards and Insights!</span>

                </span>
                <span className='login-sub-title p-2' ></span>
                <span className='login-sub-title my-3'>------ Welcome to Koipay --------</span>
                <img src={undraw_interview} className="App-logo mobile-screen-view" alt="logo" />
                <span className='my-3 ml-4 font_serif referal-content mobile-screen-view' >
                    <span className=' flex flex-col justify-center items-center' >Getting Started is a Breeze <br></br> <strong>Sign Up:</strong>
                    </span>
                    Quick and easy registration to get you started
                    <span><strong>Customize Rewards:</strong> Choose rewards that fit your business and brand</span>
                    <span className='px-1' ><strong>Drive Sales, Build Loyalty:</strong>  Activate your rewards and watch your business grow</span>
                    <span> <strong>See Your Success:</strong> Check out your dashboard to see the impact of your rewards</span>
                </span>


                {!registered && <div className='flex flex-col my-3  w-3/5 form-width'>
                    <div className='flex justify-between business-image mobile-fit  ' >
                        <div className='flex flex-col w-full mr-1' >
                            <label>
                                Business name
                            </label>
                           

                            <label className='' >
                                Color code
                            </label>
                            <input type="text" className='' placeholder=' Color code' value={colorCode} onChange={colorCodeHandleChange}  ></input>
                            {colorCodeError && <p class="mt-2   text-pink-600 text-sm">
                                {colorCodeError}
                            </p>}
                            <span className='flex flex-col' >
                                <label>
                                    Contact tel
                                </label>
                                <input type="text" className='' placeholder=' contact tel' value={contactTel} onChange={contactTelHandleChange}></input>
                                {phoneNumberError && <p class="mt-2   text-pink-600 text-sm">
                                    {phoneNumberError}
                                </p>}
                            </span>
                        </div>
                        <div className='flex flex-col' >
                            <label className='mx-2' >
                                Business Icon
                            </label>
                            {iconError && <p class="mt-2   text-pink-600 text-sm">
                                {iconError}
                            </p>}
                            <div className="upload_container border rounded-lg m-1 ">

                                {renderfile ? (
                                    <>
                                        <img src={renderfile} alt="Selected Image" className="image" />
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={(e) => handleChange(e)}

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
                                            onChange={(e) => handleChange(e)}

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
                            </div> 
                        </span>
                        {momo_tel && <p class="mt-2   text-pink-600 text-sm">
                            {momo_tel}
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
                            {reward_type && <p class="mt-2   text-pink-600 text-sm">
                                {reward_type}
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
                                        <option key={category.id} value={category.id}>
                                            {category.name}
                                        </option>
                                    ))}
                            </select>
                            {businessCategoryError && <p class="mt-2   text-pink-600 text-sm">
                                {businessCategoryError}
                            </p>}
                        </div>
                    </div>
                    <div className='flex justify-between business-image mobile-fit  ' >
                        <div className='flex flex-col w-full mr-1' >
                            <span className='flex flex-col' >
                                <label>
                                    Reward percentage
                                </label>
                                <input type="text" className='' placeholder='Reward percentage' value={reward_percentage} onChange={reward_percentageHandleChange}></input>
                                {reward_percentageError && <p class="mt-2   text-pink-600 text-sm">
                                    {reward_percentageError}
                                </p>}
                            </span>
                            <span className='flex flex-col' >
                                <label>
                                    Email (admin account)
                                </label>
                          
                            </span>
                            <span className='flex flex-col' >
                                <label>
                                    Password
                                </label>
                                <input type="password" className='' placeholder='Password' value={password} onChange={passwordHandleChange}></input>
                                {passwordError && <p class="mt-2   text-pink-600 text-sm">
                                    {passwordError}
                                </p>}
                            </span>

                        </div>
                        <div className='flex flex-col' >
                            <label className='mx-2' >
                                Business certificate
                            </label>
                            {business_certificate && <p class="mt-2   text-pink-600 text-sm">
                                {business_certificate}
                            </p>}
                            <div className="upload_container border rounded-lg m-1 ">

                                {certificate ? (
                                    <>
                                        <img src={certificate} alt="Selected Image" className="image" />

                                        <input
                                            type="file"
                                            accept="application/pdf,image/*"
                                            onChange={(e) => handleCertificateChange(e)}
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
                                            onChange={(e) => handleCertificateChange(e)}
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
                </div>}{registered && <div className='border p-4  flex justify-center items-center  flex-col    font_serif  h-full m-3 rounded-lg success-card' >

                    <div className='py-4 capitalize'  >
                        thank you,
                    </div>
                    <div className='px-5 text-center ' >
                        Your account is under review you will be contacted by email on the way forward
                    </div>

                </div>}

            </div>


        </div> */}
        </>
    )
}

export default RefereePage