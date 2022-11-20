import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { db } from '../firebase';

function Profile() {
    const location = useLocation();
    const [user, setUser] = useState('');


    useEffect(() => {
        const getUser = async () => {
            // const snapshot=await getDoc(doc(db,'users',))
            let findUser = location.search
            findUser = findUser.slice(findUser.indexOf('=') + 1);
            const userExists = await getDoc(doc(db, 'users', `${findUser}@gmail.com`));
            setUser(userExists.data());
        }
        getUser();

    }, [])

    return (
        <div className='grid place-items-center px-3 sm:px-4 mt-5'>
            {!user ?
                <h1>This user doesn't exist.</h1> :
                <div className='flex items-center space-x-2 '>
                    <img src={user.photoURL} alt=""
                        className='w-16 md:w-24 rounded-full'
                    />
                    <div className='text-sm xs-:text-lg'>
                        <h1 className='font-semibold text-xl'>{user.name}</h1>
                        <h2 className=' text-gray-700'>{user.email}</h2>
                        <h3 className='text-gray-700'>{user.postIds ? user.postIds.length : '0'} Posts</h3>
                    </div>
                </div>
            }
        </div>
    )
}

export default Profile