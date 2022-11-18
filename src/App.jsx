import React from 'react'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'
import { AuthProvider, useGlobalContext } from './context/AuthContext'
import ProtectedRoute from './components/ProtectedRoute'
import Feed from './components/Feed'


function App() {

    return (
        <BrowserRouter>
            <AuthProvider>
                <Routes>
                    <Route path='/login' element={<Login />} />
                    <Route path='/' element={<ProtectedRoute>
                        <Feed />
                    </ProtectedRoute>} />
                </Routes>
            </AuthProvider>
        </BrowserRouter>
    )
}

export default App