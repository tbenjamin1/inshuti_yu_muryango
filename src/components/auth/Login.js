import React from 'react'
import { Link } from 'react-router-dom'
import logo from "../images/login_graphic.svg"

function Login() {
    return (
        <div className='flex justify-center items-center border login-screen' >
            <div className='flex justify-center items-center bg-white login-page '>
                <div className='logo_height'>
                    <span>
                    <img src={logo} className="App-logo" alt="logo" />
                    </span>
                </div>
                <div className='flex flex-col justify-center items-center login_form'>
                    <span className='login-title'>
                        Login to your Koipay Account
                    </span>
                    <span className='login-sub-title p-2' >See what is going on with your business</span>
                    <span className='login-sub-title my-3'>------------- or Sign in with Email ------------- </span>
                    <div className='flex flex-col my-3  w-3/5'>
                        <span className='flex flex-col my-4' >
                            <label>
                            Email
                            </label>
                            <input type="text" className='' placeholder='b*****n@gmail.com' ></input>
                        </span>
                        <span className='flex flex-col' >
                            <label>
                            Password
                            </label>
                            <input type="password" className='' placeholder='Password' ></input>
                        </span>
                        <span className='flex justify-between items-center py-3'>
                            <span className='remeber_forgot flex justify-between items-center'><input type="checkbox" className='mr-1'></input> Remember me</span>
                            <Link to="/reset"><span className='remeber_forgot underline'>Forgot Password?</span></Link>
                        </span>
                        <span className=' '>    
                            <Link to="/orders"><button className='fom-btn w-full p-2'>Login</button></Link>
                        </span>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Login