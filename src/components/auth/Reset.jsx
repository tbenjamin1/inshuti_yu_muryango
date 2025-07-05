import React from 'react'
import logo from "../images/login_graphic.svg"
import { Link } from 'react-router-dom'

function Login() {
    return (
        <div className='flex justify-center items-center border login-screen' >
            <div className='flex justify-center items-center bg-white login-page '>
                <div className='logo_height'>
                    <span>
                    {/* <img src={logo} className="App-logo" alt="logo" /> */}
                    </span>
                </div>
                <div className='flex flex-col justify-center items-center login_form'>
                    <span className='login-title'>
                        Login to your  ubihindure “inshuti y’umubyeyi Account
                    </span>
                    <span className='login-sub-title p-2' >See what is going on with your business</span>
                    <span className='login-sub-title my-3'>------------- Reset password ------------- </span>
                    <div className='flex flex-col my-3  w-3/5'>
                        <span className='flex flex-col my-4' >
                            <label>
                            Email
                            </label>
                            <input type="text" className='' placeholder='b*********@gmail.com' ></input>
                        </span>
                       
                        <span className='flex justify-between items-center py-3'>
                            <span className='remeber_forgot flex justify-between items-center'> Already have an account ! </span>
                          
                            <Link to="/"><span className='remeber_forgot underline'>sign in ?</span></Link>
                        </span>
                        <span className=' '>
                        <Link to="/sign-up"><button className='fom-btn w-full p-2'>Reset</button></Link>
                           
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login