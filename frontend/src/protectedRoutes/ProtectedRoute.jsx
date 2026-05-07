import React from 'react'
import { Navigate, useLocation } from 'react-router'


const ProtectedRoute = ({children}) => {
    let location = useLocation();

    return (
        <>
            {children}
        </>
    )
}

export default ProtectedRoute