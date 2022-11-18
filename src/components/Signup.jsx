import React from 'react'
import { Link } from 'react-router-dom'
import instagram from './images/instagram.svg'


function Signup() {
    return (
        <div className='min-h-screen grid sm:place-items-center xs-:py-10'>
            <div className='mx-auto'>
                <div className=' w-full flex flex-col  xs-:max-w-sm text-center  bg-white   p-4 border-2 border-neutral-200/50 rounded-md shadow-md shadow-gray-100'>

                    <img src={instagram} alt=""
                        className='w-40 mx-auto object-contain' />

                    <p className='text-sm text-zinc-500 my-2.5'>Sign up to see photo and videos from your friends</p>

                    <form className='text-left flex flex-col space-y-3  mb-6'>
                        <input type="text" name="email" id="" placeholder='Email'
                            className='outline-none border-2 border-gray-200 focus:border-gray-300 rounded-md pl-1.5 py-1'
                        />
                        <input type="text" name="password" id="" placeholder='Password'
                            className='outline-none border-2 border-gray-200 focus:border-gray-300 rounded-md pl-1.5 py-1'
                        />
                        <button className=' bg-sky-500 text-white font-semibold hover:bg-sky-600 active:bg-sky-700 py-1.5 rounded-md'>Sign Up</button>
                    </form>
                    <p className='text-zinc-500   text-sm '>By signing up, you agree to our Terms, Conditions and cookies policy</p>
                </div>
                <h4 className='border-2 mx-4 text-gray-700 xs-:mx-0 border-neutral-200/50 py-1.5 text-center bg-white mt-3 rounded-md'>
                    Already have an account? <Link className='text-sky-600 hover:underline' to='/login'>Login</Link>
                </h4>
            </div>
        </div>
    )
}

export default Signup