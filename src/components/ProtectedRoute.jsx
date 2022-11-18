import React from 'react'
import { useGlobalContext } from '../context/AuthContext'
import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
    const { user } = useGlobalContext();
    if (user)
        return <>
            {children}
        </>
    return <Navigate to='/login' />
}

export default ProtectedRoute