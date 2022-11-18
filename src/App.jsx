import React from 'react'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Login from './components/Login'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/signup' element={<Signup />} />
                <Route path='/login' element={<Login />} />
            </Routes>
        </BrowserRouter>
    )
}

export default App