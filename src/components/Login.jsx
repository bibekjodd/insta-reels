import React from 'react'
import { Link } from 'react-router-dom'
import instagram from './images/instagram.svg'
import { FcGoogle } from 'react-icons/fc'
import { useGlobalContext } from '../context/AuthContext'


function Login() {
    const { login, loading } = useGlobalContext();

    return (
        <div className='h-screen flex flex-col'>
            {/* top  */}
            <div className='px-3 sm:px-4 md:px-5 py-2'>
                <img src={instagram} alt=""
                    className='w-24 sm:w-32 md:w-36 object-contain' />
            </div>

            {/* login */}
            <div className='h-full grid place-items-center '>
                <button
                    disabled={loading}
                    onClick={login}
                    className='flex disabled:cursor-not-allowed justify-center px-5 items-center my-10 border-2 border-gray-100  rounded-md py-2 font-semibold space-x-1'>
                    <span>Login with Google</span>
                    <FcGoogle className='text-2xl ' />
                </button>
            </div>
        </div >
    )
}

export default Login