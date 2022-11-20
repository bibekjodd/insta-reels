import React, { useEffect } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import Feed from './components/Feed'
import UploadFile from './components/UploadFile'
import Navbar from './components/Navbar'
import Profile from './components/Profile'
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from './firebase';
import { useGlobalContext } from './context/AuthContext'



function App() {
    const { user, modalOpen, setModalOpen } = useGlobalContext();

    useEffect(() => {
        const updateUserData = async () => {
            const { displayName, email, uid, photoURL } = user;
            const userExists = await getDoc(doc(db, 'users', email));
            if (!userExists._document) {
                await setDoc(doc(db, 'users', email), {
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
        <BrowserRouter>
            <div className='h-screen w-full overflow-y-hidden scrollbar-hide flex flex-col'>
                <Navbar />
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={
                        !user ? <Login /> :
                            <>
                                <UploadFile />
                                <Feed />
                            </>
                    } />
                    <Route exact path='/user' element={
                        !user ? <Login /> :
                            <>
                                <Profile />
                            </>
                    } />

                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App