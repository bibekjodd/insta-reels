import React, { useEffect, useLayoutEffect } from 'react'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { useGlobalContext } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Feed from './components/Feed'
import UploadFile from './components/UploadFile'


function App() {
    const { user } = useGlobalContext();

    return (
        <BrowserRouter>
            <div className='h-screen w-full overflow-y-hidden scrollbar-hide flex flex-col'>
                {user ? <UploadFile /> : <Login />}
                <Routes>
                    {!user && <Route path='/login' element={<Login />} />}
                    {user && <Route path='/' element={<Feed />} />}
                </Routes>
            </div>
        </BrowserRouter>
    )
}

export default App