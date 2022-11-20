import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useGlobalContext } from '../context/AuthContext'
import instagram from './images/instagram.svg'
import { MdPerson } from 'react-icons/md'
import { RiLogoutCircleLine } from 'react-icons/ri'


function Navbar() {
    const navigate = useNavigate();
    const { user, logout, modalOpen } = useGlobalContext();
    const [toggleAccount, setToggleAccount] = useState(false);

    return (
        !modalOpen && <header className='sticky py-2 px-3 sm:px-5 md:px-20 z-50 shadow-md mb-2 select-none flex items-center justify-between'>
            <Link to='/'>
                <img src={instagram} alt=""
                    className='w-24 sm:w-32 md:w-36 object-contain' />
            </Link>


            {user ? <nav className='relative w-full flex items-center justify-end '>
                <button
                    onClick={() => { setToggleAccount(!toggleAccount) }}
                >
                    <img src={user.photoURL}
                        className='w-8 rounded-full aspect-square'
                    />
                </button>
                {toggleAccount && <div className='absolute -bottom-16 bg-white right-0 w-40 z-50 p-2 px-4 shadow-md rounded-md '>
                    <button to='/home' onClick={() => {
                        setToggleAccount(false);
                        navigate(`/user?q=${user.email.slice(0, user.email.indexOf('@w'))}`)

                    }}
                        className='flex items-center space-x-2'
                    >
                        <MdPerson className='text-zinc-700' />
                        <span>Profile</span>

                    </button>
                    <button
                        onClick={logout}
                        className='flex items-center space-x-2'>
                        <RiLogoutCircleLine className='text-zinc-700' /> <span >Logout</span>
                    </button>
                </div>}
            </nav> :
                <Link to='login'
                    className='font-semibold text-lg'
                >
                    Sign In
                </Link>
            }
        </header>
    )
}

export default Navbar