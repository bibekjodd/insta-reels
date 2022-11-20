import React from 'react'
import instagram from './images/instagram.svg'
import { FcGoogle } from 'react-icons/fc'
import { useGlobalContext } from '../context/AuthContext'


function Login() {
    const { login, loading } = useGlobalContext();
    return (
        <div className='h-screen flex flex-col'>
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