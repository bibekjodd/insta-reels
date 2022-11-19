import { collection, doc, getDoc, query, setDoc, updateDoc, where } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useGlobalContext } from '../context/AuthContext'
import { db } from '../firebase';
import Posts from './Posts';
import UploadFile from './UploadFile';

function Feed() {
    const { logout, user } = useGlobalContext();

    useEffect(() => {
        const updateUserData = async () => {
            const { displayName, email, uid, photoURL } = user;
            const userExists = await getDoc(doc(db, 'users', uid));
            if (!userExists._document) {
                await setDoc(doc(db, 'users', uid), {
                    name: displayName,
                    email,
                    uid,
                    photoURL,
                });
            }


        }
        updateUserData();
    }, [])
    return (
        <div className=''>
            <button onClick={logout}>Logout</button>
            <UploadFile />
            <Posts />
        </div>
    )
}

export default Feed