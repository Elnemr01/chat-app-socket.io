import React from 'react'
import { Navigate, useLocation } from 'react-router';

const InverseProRoute = ({ children }) => {


    const location=useLocation();

    if(localStorage.getItem('chatAppUserToken')) {
        return <Navigate to='/' state={{from:location}} replace />;
    }

    return (
        <>{children}</>
    )
}

export default InverseProRoute