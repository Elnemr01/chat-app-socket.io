import React from 'react'
import { Navigate, useLocation } from 'react-router'


const ProtectedRoute = ({children}) => {
    const location=useLocation();
    
    if(!localStorage.getItem('chatAppUserToken')) {
        return <Navigate to='/login' state={{from:location}} replace />;
    }
    

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute